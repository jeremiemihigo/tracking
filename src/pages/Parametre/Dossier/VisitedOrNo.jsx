import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, Grid, TextField, Button, FormGroup, FormControl, FormLabel, Box } from '@mui/material';
import { Postinitiale } from 'Redux/initiale';
import Alert from '@mui/material/Alert';

export default function CheckboxesGroup() {
  const [initiale, setInitiale] = React.useState({ called: '', visited: '' });
  const init = useSelector((state) => state.initiale);
  const { called, visited } = initiale;
  const [action, setAction] = React.useState('');
  const dispatch = useDispatch();
  const postData = () => {
    dispatch(Postinitiale({ called, visited, action }));
  };

  return (
    <Grid container>
      <Grid item lg={12}>
        {init && init.postinitiale === 'success' && <Alert severity="success">Registration completed successfully</Alert>}
        {init && init.postinitiale === 'rejected' && <Alert severity="error">{init.postinitialeError}</Alert>}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Visited</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visited === 'visited'}
                    onChange={() =>
                      setInitiale({
                        ...initiale,
                        visited: 'visited'
                      })
                    }
                    name="visited"
                  />
                }
                label="was visited"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visited === 'nVisited'}
                    onChange={() =>
                      setInitiale({
                        ...initiale,
                        visited: 'nVisited'
                      })
                    }
                    name="nVisited"
                  />
                }
                label="was not visited"
              />
            </FormGroup>
          </FormControl>
          <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
            <FormLabel component="legend">Called</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={called === 'called'}
                    onChange={() =>
                      setInitiale({
                        ...initiale,
                        called: 'called'
                      })
                    }
                    name="called"
                  />
                }
                label="was called"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={called === 'nCalled'}
                    onChange={() =>
                      setInitiale({
                        ...initiale,
                        called: 'nCalled'
                      })
                    }
                    name="nCalled"
                  />
                }
                label="was not called"
              />
            </FormGroup>
          </FormControl>
          <TextField value={action} onChange={(e) => setAction(e.target.value)} placeholder="code action" />
        </Box>
        <Button
          disabled={init && init.postinitiale === 'pending' && true}
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => postData()}
        >
          Valider
        </Button>
      </Grid>
    </Grid>
  );
}
