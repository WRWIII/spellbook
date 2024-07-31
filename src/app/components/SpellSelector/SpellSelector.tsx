'use client'
import UASpells from '@/ua/spells/ua-spells';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, CircularProgress, Box } from '@mui/material';

interface Spell {
  index: string;
  name: string;
}

interface SpellDetails extends Spell {
  desc: string[];
  level: number;
  school: { name: string };
  components: string[];
  material: string;
  range: string;
  casting_time: string;
  duration: string;
  higher_level: string[];
  concentration: boolean;
  classes: [ { name: string } ]
}

interface SpellsData {
  results: Spell[];
}

interface SpellListSelectorProps {
  spells: SpellsData;
}

function SpellListSelector({ spells }: SpellListSelectorProps) {
  const [selectedSpell, setSelectedSpell] = useState<string>('');
  const [spellDetails, setSpellDetails] = useState<SpellDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allSpells = [...spells.results, ...UASpells];

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const spellIndex = event.target.value;
    setSelectedSpell(spellIndex);
    setLoading(true);
    setError(null);

    try {
      // Check if the selected spell is a UA spell
      const uaSpell = UASpells.find(spell => spell.index === spellIndex);
      if (uaSpell) {
        setSpellDetails(uaSpell as SpellDetails);
      } else {
        const response = await fetch(`/api/spell/${spellIndex}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spell details');
        }
        const data: SpellDetails = await response.json();
        setSpellDetails(data);
      }
    } catch (error) {
      setError('Failed to fetch spell details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormControl className='light' fullWidth color='info'>
      <InputLabel className='dark:invert' id="spell-select-label" color='info'>Select a Spell</InputLabel>
      <Select
        labelId="spell-select-label"
        id="spell-select"
        value={selectedSpell}
        label="Select a Spell"
        color='error'
        onChange={handleChange}
      >
        {allSpells.map((spell) => (
          <MenuItem key={spell.index} value={spell.index}>
            {spell.name}
          </MenuItem>
        ))}
      </Select>
      {loading && <CircularProgress className='dark:invert' />}
      {error && <p>Error: {error}</p>}
      {spellDetails && (
        <div>
          <div className={'text-xl'}>{spellDetails.name}</div>
          <div>{spellDetails.school.name}</div>
          <div>Spell level: {spellDetails.level !== 0 ? spellDetails.level : 'cantrip'}</div>
          <Box>Range: {spellDetails.range}</Box>
          <Box>Casting Time: {spellDetails.casting_time}</Box>
          <Box>Concentration: {spellDetails.concentration ? "Yes" : "No"}</Box>
          <Box>Duration: {spellDetails.duration}</Box>
          <div>Components: {spellDetails.components.join(', ')}</div>
          {spellDetails.material && <div>Materials: {spellDetails.material}</div>}
          <div style={{ border: '1px solid white', borderRadius: '8px', padding: '20px' }}>
            {spellDetails.desc.map((paragraph, index) => (
              <Box sx={{ fontFamily: 'Futura', fontSize: '18px' }} key={index}>{paragraph}</Box>
            ))}
          </div>
          {spellDetails.higher_level.length > 0 && <div>Higher level cast: {spellDetails.higher_level.join(', ')}</div>}
          <div>Classes: {spellDetails.classes.map((item) => (
              item.name + ' '
            ))}</div>
        </div>
      )}
    </FormControl>
  );
}

export default SpellListSelector;
