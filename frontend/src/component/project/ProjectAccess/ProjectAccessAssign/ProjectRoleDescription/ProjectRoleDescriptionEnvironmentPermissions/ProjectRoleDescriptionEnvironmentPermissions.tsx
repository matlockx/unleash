interface IProjectRoleDescriptionEnvironmentPermissionsProps {
    environment: string;
    permissions: any[];
}

export const ProjectRoleDescriptionEnvironmentPermissions = ({
    environment,
    permissions,
}: IProjectRoleDescriptionEnvironmentPermissionsProps) => (
    <>
        {permissions
            .filter((permission: any) => permission.environment === environment)
            .map((permission: any) => permission.displayName)
            .sort()
            .map((permission: any) => (
                <p key={permission}>{permission}</p>
            ))}
    </>
);
