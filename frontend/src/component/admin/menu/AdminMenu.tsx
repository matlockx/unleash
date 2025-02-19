import { useLocation } from 'react-router-dom';
import { Paper, Tab, Tabs } from '@mui/material';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import { CenteredNavLink } from './CenteredNavLink';

function AdminMenu() {
    const { uiConfig } = useUiConfig();
    const { pathname } = useLocation();
    const { isBilling } = useInstanceStatus();
    const { flags } = uiConfig;

    const activeTab = pathname.split('/')[2];

    return (
        <Paper
            style={{
                marginBottom: '1rem',
                borderRadius: '12.5px',
                boxShadow: 'none',
            }}
        >
            <Tabs
                value={activeTab}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                <Tab
                    value="users"
                    label={
                        <CenteredNavLink to="/admin/users">
                            <span>Users</span>
                        </CenteredNavLink>
                    }
                />
                {flags.UG && (
                    <Tab
                        value="groups"
                        label={
                            <CenteredNavLink to="/admin/groups">
                                <span>Groups</span>
                            </CenteredNavLink>
                        }
                    />
                )}
                {flags.RE && (
                    <Tab
                        value="roles"
                        label={
                            <CenteredNavLink to="/admin/roles">
                                <span>Project roles</span>
                            </CenteredNavLink>
                        }
                    />
                )}
                <Tab
                    value="api"
                    label={
                        <CenteredNavLink to="/admin/api">
                            API access
                        </CenteredNavLink>
                    }
                />
                {uiConfig.flags.embedProxyFrontend && (
                    <Tab
                        value="cors"
                        label={
                            <CenteredNavLink to="/admin/cors">
                                CORS origins
                            </CenteredNavLink>
                        }
                    />
                )}
                <Tab
                    value="auth"
                    label={
                        <CenteredNavLink to="/admin/auth">
                            Single sign-on
                        </CenteredNavLink>
                    }
                />
                <Tab
                    value="instance"
                    label={
                        <CenteredNavLink to="/admin/instance">
                            Instance stats
                        </CenteredNavLink>
                    }
                />
                {flags.networkView && (
                    <Tab
                        value="network"
                        label={
                            <CenteredNavLink to="/admin/network">
                                Network
                            </CenteredNavLink>
                        }
                    />
                )}
                {isBilling && (
                    <Tab
                        value="billing"
                        label={
                            <CenteredNavLink to="/admin/billing">
                                Billing
                            </CenteredNavLink>
                        }
                    />
                )}
            </Tabs>
        </Paper>
    );
}

export default AdminMenu;
