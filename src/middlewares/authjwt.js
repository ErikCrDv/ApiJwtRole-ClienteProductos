import jwt, { decode } from "jsonwebtoken";
import config from '../config';

import User from '../models/User';
import Role from '../models/Role';
import { json } from "express";

export const verifyToken = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: 'No Token provided'});
        
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, {password: 0});
        console.log(user);
        if(!user) return res.status(404).json({message: 'No user found'});
    
        next();

    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    
};

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    const roleslength = roles.length;
    for(let i = 0; i < roleslength; i++){
        if(roles[i].name === 'moderator'){
            next();
            return;
        }  
    }
    console.log(roles);
    return res.status(403).json({message: 'Require Moderator role'});
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    const roleslength = roles.length;
    for(let i = 0; i < roleslength; i++){
        if(roles[i].name === 'admin'){
            next();
            return;
        }  
    }
    console.log(roles);
    return res.status(403).json({message: 'Require Admin role'});
};