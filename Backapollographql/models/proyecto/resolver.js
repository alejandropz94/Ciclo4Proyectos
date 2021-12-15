import { Project } from './proyecto.js'
import mongoose from 'mongoose';

export const resolverProyecto = {
    Query: {
        getAllProjects: async () => {
            const projects = await Project.find().populate("lider");
            return projects;
        },
        getProjectsByLider: async (_, { _id }) => {
            const project = await Project.find({lider: mongoose.Types.ObjectId(_id)}).populate("lider");
            return project;
        },
        getProject: async (_, { _id }) => {
            const project = await Project.findById(_id);
            return project;
        }        
    },
    Mutation: {
        createProject: async (_, { input }) => {
            const newProject = new Project(input);
            await newProject.save();
            return newProject;
        },
        deleteProject: async (_, { _id }) => {
            const deletedProject = await Project.findByIdAndDelete(_id);
            return deletedProject;
        },
        updateProject: async (_, { _id, input }) => {
            const updatedProject = await Project.findByIdAndUpdate(_id, input, { new: true });
            return updatedProject;
        }
    }

}