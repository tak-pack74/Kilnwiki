import React, { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow,
         TableCell, Modal, Box, Checkbox } from '@mui/material';
         
import APIService from './APIService'

const TagSelector = props => {
  const [tags, setTags] = useState([]);
  
  const handleTagSelectorClose = () => props.setIsTagSelectorOpened(false)

  useEffect(() => {
    if (props.isTagSelectorOpened === true) {
      APIService.fetchAllTags()
      .then(response => setTags(response))
      .catch(error => console.log(error))
      }
  },[props.isTagSelectorOpened]) // タグ選択画面を開いたときに再fetch

  const handleCheckboxClick= (isChecked, tag_id) => {
    let newSelectedTags = props.selectedTags.slice();

    if (isChecked) {
      newSelectedTags.push(tag_id)
      props.setSelectedTags(newSelectedTags)
    } else {
      props.setSelectedTags(newSelectedTags.filter(value => {
        return value !== tag_id
      }))
    }
  }

  const renderTagTable = () => {
    const id_width = '5%';
    const name_width = '25%';
    const description_width = '70%';

    return (
      <TableContainer sx={{height: '100%'}}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow key="table-header">
              <TableCell  align="center"></TableCell>
              <TableCell style={{ width: id_width }} align="center">Id</TableCell>
              <TableCell style={{ width: name_width }} align="left">Name</TableCell>
              <TableCell style={{ width: description_width }} align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map(tag => (
              <TableRow key={tag.id}>
                <TableCell  align="center">
                <Checkbox
                  color="primary"
                  onChange={e => handleCheckboxClick(e.target.checked, tag.id)}
                  defaultChecked={props.selectedTags.includes(tag.id) ? true : false }
                />
                </TableCell>
                <TableCell style={{ width: id_width }} align="center" component="th" scope="row">{tag.id}</TableCell>
                <TableCell style={{ width: name_width }} align="left">{tag.name}</TableCell>
                <TableCell style={{ width: description_width }} align="left">{tag.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };

  const tagSelectorStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-35%, -50%)',
    height: '60%',
    width: '60%',
    minheight: 300,
    minwidth: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 4,
    p: 4,
  };

  return (
    <div>
      <Modal
        BackdropProps={{
          sx: {
            bgcolor: 'transparent',
          }
        }}
        open={props.isTagSelectorOpened}
        onClose={handleTagSelectorClose}
      >
        <Box sx={tagSelectorStyle}>
          {/* タグ一覧テーブル */}
          {renderTagTable()}
        </Box>
      </Modal>
    </div>
  );
};

export default TagSelector