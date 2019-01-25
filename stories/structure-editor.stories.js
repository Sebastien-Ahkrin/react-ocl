import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { StructureEditor } from '../full';

const initialMolfile = `
Actelion Java MolfileCreator 1.0

  6  5  0  0  0  0  0  0  0  0999 V2000
    3.4641   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.5981   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.7321   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.7321   -1.5000   -0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    0.8660   -0.0000   -0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  2  1  1  0  0  0  0
  3  2  1  0  0  0  0
  4  3  2  0  0  0  0
  5  3  1  0  0  0  0
  6  5  1  0  0  0  0
M  END
`;

function MolfileDemo() {
  const [molfile, setMolfile] = useState(initialMolfile);
  const [previous, setPrevious] = useState(null);
  const cb = useCallback(
    (newMolfile) => {
      setMolfile(newMolfile.molfile);
      setPrevious(molfile);
    },
    [setMolfile, setPrevious, molfile]
  );
  return (
    <div>
      <h2>Editor</h2>
      <StructureEditor
        molfile={initialMolfile}
        fragment={boolean('fragment', false)}
        onChange={cb}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center' }}>Current</h2>
          <pre>{molfile}</pre>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center' }}>Previous</h2>
          <pre>{previous}</pre>
        </div>
      </div>
    </div>
  );
}

storiesOf('StructureEditor', module).add(
  'From molfile',
  () => <MolfileDemo />,
  {
    info: {
      text: 'StructureEditor is an uncontrolled component',
      source: false,
      propTables: [StructureEditor],
      propTablesExclude: [MolfileDemo]
    }
  }
);
