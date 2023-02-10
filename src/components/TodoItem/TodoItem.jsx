import React, {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Accordion, AccordionDetails, AccordionSummary, Box, Switch, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DataService} from "../../services/dataService";
import Button from "../Button/Button";
import styles from './TodoItem.module.css'
import axios from "axios";

const TodoItem = ({item}) => {

    let userId = item._id;
    let doned = item.done

    const client = useQueryClient()

    const [expanded, setExpanded] = useState(false);

    const [done, setDone] = useState(doned);

    const {mutate} = useMutation(['delete'], DataService.removeTodo, {
        onSuccess: () => client.invalidateQueries(['getAll'])
    })

    const {mutate: changeM} = useMutation(async (todo) => {
        return await axios.patch(`http://localhost:3007/change/${userId}`, todo)
    }, {
        onSuccess: () => client.invalidateQueries(['getAll'])
    })

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSwitch = (e) => {
        e.stopPropagation()
        setDone(true)
        changeM({done: true})
    }

    const handleRemoveTodo = (id) => {
        mutate(id)
    }

    const label = {inputProps: {'aria-label': 'Switch demo'}};

    return (
        <Box sx={{width: "350px", margin: '0 auto 15px'}}>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{width: '70%', fontSize: '20px', textDecoration: done ? 'line-through' : 'none'}}>
                        {item.title[0].toUpperCase() + item.title.slice(1)}
                    </Typography>
                    <div className={styles.switch}>
                        <Switch defaultChecked={done} disabled={done}  {...label} onClick={(e) => handleSwitch(e)}/>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.todoDesc}>
                        <Typography>
                            {item.body.substr(0, 12)}...
                        </Typography>
                        {done && <Button text={'Delete'} func={() => handleRemoveTodo(userId)}>Delete</Button>}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default TodoItem;