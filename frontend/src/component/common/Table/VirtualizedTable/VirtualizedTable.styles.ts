import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
    row: {
        position: 'absolute',
        width: '100%',
        '&:hover': {
            '.show-row-hover': {
                opacity: 1,
            },
        },
    },
    cell: {
        alignItems: 'center',
        display: 'flex',
        flexShrink: 0,
        '& > *': {
            flexGrow: 1,
        },
    },
}));
