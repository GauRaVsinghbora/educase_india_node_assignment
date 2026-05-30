import { apierror } from "../utils/apiError.js";
import { apiresponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import {pool} from "../config/db.js";

// anlayze github repos and store in db
export const analyzeGitHubRepos = asyncHandler(async (req, res) => {
    try {
        const { usename } = req.params;
        const response = await axios.get(`https://api.github.com/users/${usename}`);
        const data = response.data;

        const age = new Date().getFullYear() - new Date(data.created_at).getFullYear();
       
        const ratio =(data.followers / (data.following || 1)).toFixed(2);

        await pool.query(
            `
            INSERT INTO github_profiles (username,name , followers, following, public_repos,public_gists, profile_url, avatar_url, account_age_years, follower_ratio)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            followers = VALUES(followers),
            following = VALUES(following),
            public_repos = VALUES(public_repos),
            account_age_years = VALUES(account_age_years),
            follower_ratio = VALUES(follower_ratio)
            `
        , [data.login, data.name, data.followers, data.following, data.public_repos, data.public_gists, data.html_url, data.avatar_url, age, ratio])

        return res.status(200).json(new apiresponse(200, "GitHub repository analysis successful", {
            username: data.login,
            name: data.name,
            followers: data.followers,
            following: data.following,
            public_repos: data.public_repos,
            public_gists: data.public_gists,
            profile_url: data.html_url,
            avatar_url: data.avatar_url,
            account_age_years: age,
            follower_ratio: ratio
        }));
    } catch (error) {
        console.error("Error analyzing GitHub repositories:", error);
        throw new apierror(500, "Failed to analyze GitHub repositories");
    }
});

// get all github profiles 
export const getAllGitHubProfiles = asyncHandler(async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM github_profiles");
        return res.status(200).json(new apiresponse(200, "GitHub profiles retrieved successfully", rows));
    } catch (error) {
        console.error("Error retrieving GitHub profiles:", error);
        throw new apierror(500, "Failed to retrieve GitHub profiles");
    }
});

// get single github profile by username
export const getGitHubProfileByUsername = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            throw new apierror(400, "Username parameter is required");
        }
        const [rows] = await pool.query("SELECT * FROM github_profiles WHERE username = ?", [username]);
        if (rows.length === 0) {
            throw new apierror(404, "GitHub profile not found");
        }
        return res.status(200).json(new apiresponse(200, "GitHub profile retrieved successfully", rows[0]));
    } catch (error) {
        console.error("Error retrieving GitHub profile:", error);
        throw error instanceof apierror ? error : new apierror(500, "Failed to retrieve GitHub profile");
    }
});

