import React, { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { awxApiRef, Playbook } from '../api/awxClient';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

export const AwxComponent = () => {
  const awxApi = useApi(awxApiRef);
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaybooks = async () => {
      const playbooks = await awxApi.getPlaybooks();
      setPlaybooks(playbooks);
      setLoading(false);
    };

    fetchPlaybooks();
  }, [awxApi]);

  const handleLaunch = async (id: number) => {
    await awxApi.launchPlaybook(id);
    alert(`Playbook ${id} lanzado`);
  };

  if (loading) {
    return <div>Cargando playbooks...</div>;
  }

  return (
    <div>
      <h1>Playbooks de AWX</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playbooks.map(playbook => (
            <TableRow key={playbook.id}>
              <TableCell>{playbook.id}</TableCell>
              <TableCell>{playbook.name}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleLaunch(playbook.id)}>
                  Lanzar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

