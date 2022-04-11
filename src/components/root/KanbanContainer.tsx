import ProjectBarContainer from "../ProjectBar/ProjectBarContainer";
import {useCallback, useMemo, useState} from "react";
import Project from "../ProjectBar/entity/Project";
import BoardBodyContainer from "../Board/Body/container/BoardBodyContainer";
import {Box} from "@mui/material";
import {makeSampleProject} from "../ProjectBar/SampleProjectBuilder";

const KanbanContainer = () => {
    const sampleProject = makeSampleProject("osoniee board");
    const [projects, setProjects] = useState<Project[]>([sampleProject]);
    const [projectId, setProjectId] = useState(sampleProject.projectId);

    // const setProject = useCallback((projectId: string) => {
    //     setProjectId(projectId);
    // }, [projectId]);

    // const addProject = useCallback((project: Project) => {
    //     setProjects(projects => [...projects, project])
    // }, [projects])

    // const getProject = useCallback(() => {
    //     return projects.find((project) => {
    //         return project.projectId === projectId;
    //     })
    // }, [projectId]);

    // const projectTitle = useMemo(() => {
    //     const project = getProject();
    //     return project?.title || '';
    // }, [projectId, getProject]);

    return (
        <div>
            <ProjectBarContainer projectId={projectId} projects={projects}/>
            {/*<BoardHeaderContainer projectId={projectId} title={projectTitle}/>*/}
            <Box alignItems={"center"} alignContent={"center"}>
            <BoardBodyContainer projectId={projectId}/>
            </Box>
        </div>
    );
}

export default KanbanContainer;
