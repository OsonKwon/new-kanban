import TopAppBar from "./TopBar/TopAppBar";
import {useCallback, useMemo, useState} from "react";
import Project from "./TopBar/entity/Project";
import BoardHeaderContainer from "./Board/Header/BoardHeaderContainer";
import BoardBodyContainer from "./Board/Body/BoardBodyContainer";
import {Box, Container} from "@mui/material";

const KanbanContainer = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectId, setProjectId] = useState('');

    const setProject = useCallback((projectId: string) => {
        setProjectId(projectId);
    }, [projectId]);

    const addProject = useCallback((project: Project) => {
        setProjects(projects => [...projects, project])
    }, [projects])

    const getProject = useCallback(() => {
        return projects.find((project) => {
            return project.projectId === projectId;
        })
    }, [projectId]);

    const projectTitle = useMemo(() => {
        const project = getProject();
        return project?.title || '';
    }, [projectId, getProject]);

    console.log("render KanbanContainer");

    return (
        <div>
            <TopAppBar title={projectTitle} projects={projects}/>
            {/*<BoardHeaderContainer projectId={projectId} title={projectTitle}/>*/}
            <Box alignItems={"center"} alignContent={"center"}>
            <BoardBodyContainer projectId={projectId}/>
            </Box>
        </div>
    );
}

export default KanbanContainer;
