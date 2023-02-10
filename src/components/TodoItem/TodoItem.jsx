import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Accordion, AccordionDetails, AccordionSummary, Box, Switch, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DataService} from "../../services/dataService";
import Button from "../Button/Button";
import styles from './TodoItem.module.css'

const TodoItem = ({item}) => {

    const client = useQueryClient()

    const [expanded, setExpanded] = useState(false);

    const [done, setDone] = useState(false);

    const {mutate} = useMutation(['delete'], DataService.removeTodo, {
        onSuccess: () => client.invalidateQueries(['getAll'])
    })

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSwitch = (e) => {
        e.stopPropagation()
        setDone(prevState => !prevState)
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
                        <Switch disabled={done} {...label} onClick={(e) => handleSwitch(e)}/>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.todoDesc}>
                        <Typography>
                            {item.body.substr(0, 12)}...
                        </Typography>
                        {done && <Button text={'Delete'} func={() => handleRemoveTodo(item._id)}>Delete</Button>}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default TodoItem;