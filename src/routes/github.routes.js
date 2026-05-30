import { Router } from "express";
import {analyzeGitHubRepos,getAllGitHubProfiles,getGitHubProfileByUsername} from "../controller/github.controller.js";
const router = Router();

router.post("/analyze/:usename", analyzeGitHubRepos);
router.get("/Allprofiles", getAllGitHubProfiles);
router.get("/profile/:username", getGitHubProfileByUsername);


export default router;