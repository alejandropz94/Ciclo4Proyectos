import Project from '../models/project'

export const resolvers = {
    Query: {
        getAllProjects: async () => {
            const projects = await Project.find().populate("lider");
            return projects;
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