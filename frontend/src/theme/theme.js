import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
    background: { default: '#fafafa', paper: '#fff' }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600, marginBottom: 16 },
    h6: { fontWeight: 500 }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 1px 3px rgba(0,0,0,0.12)', '&:hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.15)' } } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } } }
  }
})
