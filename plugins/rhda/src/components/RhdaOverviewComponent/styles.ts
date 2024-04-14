// styles.ts
import { Theme, makeStyles,  } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  infoCard: {
    marginBottom: theme.spacing(3),
  },
  alertsCount: {
    alignSelf: 'center',
  },
  critical: {
    color: theme.palette.type === 'dark' ? '#f85149' : '#cf222e',
  },
  high: {
    color: theme.palette.type === 'dark' ? '#db6d28' : '#bc4c00',
  },
  medium: {
    color: theme.palette.type === 'dark' ? '#d29922' : '#bf8600',
  },
  low: {
    color: theme.palette.type === 'dark' ? '#c9d1d9' : '#24292f',
  },
}));

export default useStyles;