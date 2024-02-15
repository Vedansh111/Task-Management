import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function FilterDropDown(props) {
    return (
        <Box sx={{ width: '8rem', marginBottom: "8px" }} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.age}
                    label="Age"
                    onChange={props.handleChange}
                >
                    {props.items.map((val) => {
                        console.log(val.name);
                        return <MenuItem value={val.no} key={val.no}>{val.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box >
    )
}

export default FilterDropDown