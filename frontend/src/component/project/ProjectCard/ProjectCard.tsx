import { Card, Menu, MenuItem } from '@mui/material';
import { useStyles } from './ProjectCard.styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as ProjectIcon } from 'assets/icons/projectIcon.svg';
import React, { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { getProjectEditPath } from 'utils/routePathHelpers';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import {
    DELETE_PROJECT,
    UPDATE_PROJECT,
} from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';
import { DEFAULT_PROJECT_ID } from 'hooks/api/getters/useDefaultProject/useDefaultProjectId';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import { useFavoriteProjectsApi } from 'hooks/api/actions/useFavoriteProjectsApi/useFavoriteProjectsApi';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { FavoriteIconButton } from 'component/common/FavoriteIconButton/FavoriteIconButton';
import { DeleteProjectDialogue } from '../Project/DeleteProject/DeleteProjectDialogue';

interface IProjectCardProps {
    name: string;
    featureCount: number;
    health: number;
    memberCount: number;
    id: string;
    onHover: () => void;
    isFavorite?: boolean;
}

export const ProjectCard = ({
    name,
    featureCount,
    health,
    memberCount,
    onHover,
    id,
    isFavorite = false,
}: IProjectCardProps) => {
    const { classes } = useStyles();
    const { hasAccess } = useContext(AccessContext);
    const { isOss, uiConfig } = useUiConfig();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [showDelDialog, setShowDelDialog] = useState(false);
    const navigate = useNavigate();
    const { favorite, unfavorite } = useFavoriteProjectsApi();
    const { refetch } = useProjects();

    const handleClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const canDeleteProject =
        hasAccess(DELETE_PROJECT, id) && id !== DEFAULT_PROJECT_ID;

    const onFavorite = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (isFavorite) {
            await unfavorite(id);
        } else {
            await favorite(id);
        }
        refetch();
    };

    return (
        <Card className={classes.projectCard} onMouseEnter={onHover}>
            <div className={classes.header} data-loading>
                <ConditionallyRender
                    condition={Boolean(uiConfig?.flags?.favorites)}
                    show={() => (
                        <FavoriteIconButton
                            onClick={onFavorite}
                            isFavorite={isFavorite}
                            size="medium"
                            sx={{ ml: -1 }}
                        />
                    )}
                />
                <h2 className={classes.title}>{name}</h2>

                <PermissionIconButton
                    permission={UPDATE_PROJECT}
                    hidden={isOss()}
                    projectId={id}
                    data-loading
                    onClick={handleClick}
                    tooltipProps={{
                        title: 'Options',
                        className: classes.actionsBtn,
                    }}
                >
                    <MoreVertIcon />
                </PermissionIconButton>

                <Menu
                    id="project-card-menu"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    style={{ top: 0, left: -100 }}
                    onClick={event => {
                        event.preventDefault();
                    }}
                    onClose={(event: SyntheticEvent) => {
                        event.preventDefault();
                        setAnchorEl(null);
                    }}
                >
                    <MenuItem
                        onClick={e => {
                            e.preventDefault();
                            navigate(getProjectEditPath(id));
                        }}
                    >
                        <Edit className={classes.icon} />
                        Edit project
                    </MenuItem>
                    <MenuItem
                        onClick={e => {
                            e.preventDefault();
                            setShowDelDialog(true);
                        }}
                        disabled={!canDeleteProject}
                    >
                        <Delete className={classes.icon} />
                        {id === DEFAULT_PROJECT_ID && !canDeleteProject
                            ? "You can't delete the default project"
                            : 'Delete project'}
                    </MenuItem>
                </Menu>
            </div>
            <div data-loading>
                <ProjectIcon className={classes.projectIcon} />
            </div>
            <div className={classes.info}>
                <div className={classes.infoBox}>
                    <p className={classes.infoStats} data-loading>
                        {featureCount}
                    </p>
                    <p data-loading>toggles</p>
                </div>
                <div className={classes.infoBox}>
                    <p className={classes.infoStats} data-loading>
                        {health}%
                    </p>
                    <p data-loading>health</p>
                </div>

                <ConditionallyRender
                    condition={id !== DEFAULT_PROJECT_ID}
                    show={
                        <div className={classes.infoBox}>
                            <p className={classes.infoStats} data-loading>
                                {memberCount}
                            </p>
                            <p data-loading>members</p>
                        </div>
                    }
                />
            </div>
            <DeleteProjectDialogue
                project={id}
                open={showDelDialog}
                onClose={() => {
                    setAnchorEl(null);
                    setShowDelDialog(false);
                }}
            />
        </Card>
    );
};
