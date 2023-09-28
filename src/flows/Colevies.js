import React, {useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Input,
  Select,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import TablePagination from '@mui/material/TablePagination';

import { format } from 'date-fns';

const inputStyle = {
  textDecoration: 'none',
};
const greyIconStyle = { color: 'grey' };
const smallIconStyle = { fontSize: '16px' };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  root: {
    padding: '6px',
  },
}));

// const getCurrentDate = () => {
//   const currentDate = new Date();
//   const day = String(currentDate.getDate()).padStart(2, '0');
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//   const year = currentDate.getFullYear();
//   const formattedDate = `${day}-${month}-${year}`;
//   return formattedDate;
// };
const getCurrentDatetime = () => {
  const currentDatetime = new Date();
  const year = currentDatetime.getFullYear();
  const month = String(currentDatetime.getMonth() + 1).padStart(2, '0');
  const day = String(currentDatetime.getDate()).padStart(2, '0');
  const hours = String(currentDatetime.getHours()).padStart(2, '0');
  const minutes = String(currentDatetime.getMinutes()).padStart(2, '0');
  const seconds = String(currentDatetime.getSeconds()).padStart(2, '0');
  const formattedDatetime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDatetime;
};



// const formatDate = (dateString) => {
//   const dateParts = dateString.split('-');
//   if (dateParts.length === 3) {
//     const [year, month, day] = dateParts;
//     return `${day}-${month}-${year}`;
//   }
//   return dateString; // Return the original date if it's not in the expected format
// };
const NewTableCell = styled(TableCell)(({ theme }) => ({
  padding: '8px',
  fontSize: '13px',
  fontFamily: 'sans-serif',
}));

function Colevies() {
  const ttypOptions = ['BLR', 'CO', 'HYD', 'RAN'];
  const statusOptions = ['Draft', 'Submitted'];
  const ledgerOptions = [
    'CO Levies - Advance Tax 1%',
    'CO Levies - Admin Charges 4 %',
    'CO Levies - Ad charges 1% B2B',
  ];
  const initialFormData = {
    transactionType: '',
    documentDate: '',
    year: '',
    period: '',
    reference: '',
    paymentProject: '',

    receiptProject: '',
    ledger: '',
    amount: '',
    status: '',
    createdDate: getCurrentDatetime(), // Updated to datetime format
    createdBy: '',
    submittedOn: getCurrentDatetime(), // Updated to datetime format
    submittedBy: '',
  };
  

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  const displayedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);



  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const Cookie = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get('https://api.p360.build:6060/v1/fundflow/colevis/getCoLevies', Cookie);
      const data = response.data.data;
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveNewRowToDatabase = async (newRowData) => {
    try {
      const token = localStorage.getItem('accessToken');
      // const token='eyJraWQiOiJqQXY5SGRqOFpGa09NbSt1TnZlVUlqSHNrTjYyWm11Z0tHTzJGT0VHcG4wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMWU2NGUxYS0zYmNmLTQ4MmUtYjEwYi1iYjIwMDdmMjZlM2UiLCJjb2duaXRvOmdyb3VwcyI6WyJNRE0iLCJHYXRlcGFzcyJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfTFR5WFlaZUQzIiwiY2xpZW50X2lkIjoiMTRkZWd2ZjFxNmxqcWtsMXZsdjdqMjN2dWUiLCJvcmlnaW5fanRpIjoiNmI2YWMzY2YtNjViZC00ZGEyLTg1MDYtNjA1ZWM0MzZhMjczIiwiZXZlbnRfaWQiOiJlOWM1ZWJhMS00ZTc2LTQ2NjItYjFkYS1lMzdjZGJhMWY3NGMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk1NTc4MDUwLCJleHAiOjE2OTU2NjQ0NTAsImlhdCI6MTY5NTU3ODA1MCwianRpIjoiOTNjNjA2YWQtY2Q4YS00ZmJhLWE4ZDItNGFkYmMwZjM3ODk1IiwidXNlcm5hbWUiOiIxMWU2NGUxYS0zYmNmLTQ4MmUtYjEwYi1iYjIwMDdmMjZlM2UifQ.Y_gasl-wvdEomxloaN3jHPqOZyAo3xHqTXRY6IahSQJwNrred0eczBh-pfi31KmcbrpyGW0mz-U2leRB9kodIlmtjjpDrt8PUW4bDPS5xK0vMQuSKcX9iNNlhDjZCaGVEm-mc-1Gmq8fBG4SywxAt9jlu-w6uz-uaa1DHXXALA12bNNE4ovIRPMRYDOtOx4HTkyclUvql78BUjCLY1Ti46t9fRws1A8EuWFA2TRjqZX_uVHUP6RMRKs63ufx3suH5_xAMddHNaW_AisMGrZvCOTtUoDCb90NFDCq2brJCqn8cj7wCWdigm_4F1zWhP8sO7QCPVMWGq_JFgBq785t4Q'
      if (!token) {
        console.error('Access token is missing. Please ensure the user is authenticated.');
        return;
      }

      const response = await axios.post(
        'https://api.p360.build:6060/v1/fundflow/colevis/addCoLevies',
          {
            transactionType:newRowData.transactionType,
            documentDate: newRowData.documentDate ,
            year:  newRowData.year,
            period: newRowData.period ,
            reference: newRowData.reference,
            paymentProject:newRowData.paymentProject ,
            receiptProject: newRowData.receiptProject,
            ledger:newRowData.ledger ,
            amount:newRowData.amount ,
            status:newRowData.status ,
            createdDate:newRowData.createdDate ,
            createdBy: newRowData.createdBy,
            submittedOn:newRowData.submittedOn,
            submittedBy:newRowData.submittedBy
        
        },
        
          {

            headers: {

              Authorization: `Bearer ${token}`,
              'Content-Type':'application/json',

            },

          }
        
      );
      console.log('New row data saved:', response.data);

    // Check the response status
    if (response.status === 200) {
      console.log('New row data saved:', response.data);
      // Perform any necessary actions after successful save
    } else {
      console.error('Error saving new row. Unexpected response status:', response.status);
      // Handle the error accordingly
    }
  } catch (error) {
    console.error('Error saving new row:', error);
    // Handle the error, log it, or show an error message to the user
  }
};

const handleAddClick = () => {
  setIsAddingRow(true);
  const currentDatetime = getCurrentDatetime();
const submittedDatetime = getCurrentDatetime(); // Set a different value for submittedOn
setFormData({
  ...initialFormData,
  createdDate: currentDatetime,
  submittedOn: submittedDatetime,
});

};

  const handleCancelClick = () => {
    setIsAddingRow(false);
    setIsEditing(false);
    setEditingRowIndex(null);
    setFormData(initialFormData);
  };

 const handleSaveClick = () => {
  if (isEditing && editingRowIndex !== null) {
    const updatedData = [...data];
    updatedData[editingRowIndex] = formData;
    setData(updatedData);
    setIsEditing(false);
    setEditingRowIndex(null);
    setFormData(initialFormData);
    updateRowInDatabase(formData);
    // Call the saveNewRowToDatabase function here for editing
    // saveNewRowToDatabase(formData);
  } else {
    // Set the submittedOn field to the current datetime when adding a new row
    const currentDatetime = getCurrentDatetime(); // Get the current datetime
    const updatedFormData = { ...formData, submittedOn: currentDatetime }; // Set "submittedOn" to the current datetime
    setData([updatedFormData, ...data]);
    setIsAddingRow(false);
    setFormData(initialFormData);
    saveNewRowToDatabase(updatedFormData);
    console.log('post');
  }
};

const handleEditClick = (index) => {
  if (data[index].status === 'Submitted') {
    alert("Editing is not allowed for submitted documents.");
    return;
  }

  if (isEditing && editingRowIndex === index) {
    handleSaveClick();
  } else {
    const selectedRowData = data[index];
    setFormData(selectedRowData);
    setIsEditing(true);
    setEditingRowIndex(index);
  }
};

  const handleDuplicateClick = (index) => {
    const selectedRowData = data[index];
    const duplicatedRowData = { ...selectedRowData };
    setFormData(duplicatedRowData);
    setIsAddingRow(true);
  };

  const handleInputChange = (field) => (event) => {
  const value = event.target.value;
  if (field === 'documentDate') {
    const formattedDate = value.split('T')[0]; // Extract date part from datetime-local
    setFormData({ ...formData, [field]: formattedDate });
  }  else if (field === ' createdDate' || field === 'submittedOn') {
 const formattedDatetime = `${value} 00:00:00`; // You can change the time part as needed
setFormData({ ...formData, [field]: formattedDatetime });

}
 else if (field === 'reference') {
    if (value.length <= 30) {
      setFormData({ ...formData, [field]: value });
    }
  } else if (field === 'paymentProject' || field === 'receiptProject') {
    if (value.length === 9) {
      setFormData({ ...formData, [field]: value });
    } else if (value.length < 9) {
      setFormData({ ...formData, [field]: value });
    }
  } else if (field === 'amount') {
    if (!isNaN(value)) {
      setFormData({ ...formData, [field]: value });
    }
  } else {
    setFormData({ ...formData, [field]: value });
  }
};
// ... (Previous imports)

const updateRowInDatabase = async (updatedRowData) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token is missing. Please ensure the user is authenticated.');
      return;
    }

    const response = await axios.put(
      `https://api.p360.build:6060/v1/fundflow/colevis/updateCoLevies`, // Update the API endpoint with the row's unique identifier (id)
      {
        transactionType: updatedRowData.transactionType,
        documentDate: updatedRowData.documentDate,
        year: updatedRowData.year,
        period: updatedRowData.period,
        reference: updatedRowData.reference,
        paymentProject: updatedRowData.paymentProject,
        receiptProject: updatedRowData.receiptProject,
        ledger: updatedRowData.ledger,
        amount: updatedRowData.amount,
        status: updatedRowData.status,
        createdDate: updatedRowData.createdDate,
        createdBy: updatedRowData.createdBy,
        submittedOn: updatedRowData.submittedOn,
        submittedBy: updatedRowData.submittedBy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check the response status
    if (response.status === 200) {
      console.log('Row updated:', response.data);
      // Perform any necessary actions after successful update
    } else {
      console.error('Error updating row. Unexpected response status:', response.status);
      // Handle the error accordingly
    }
  } catch (error) {
    console.error('Error updating row:', error);
    // Handle the error, log it, or show an error message to the user
  }
};
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
        </div>
        {!isAddingRow && !isEditing && (
          <Tooltip title="Add">
            <IconButton style={{ color: 'grey' }} aria-label="add new" onClick={handleAddClick}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <TableContainer component={Paper} style={{ maxWidth: '100%', overflow: 'auto', margin: '0px 25px 0px 10px', width: '98%' }}>
        <Table sx={{ minWidth: 1800 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>TTyp</StyledTableCell>
              <StyledTableCell>Document Date</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Period</StyledTableCell>
              <StyledTableCell>Reference</StyledTableCell>
              <StyledTableCell>Payment Project</StyledTableCell>
              <StyledTableCell>Receipt Project</StyledTableCell>
              <StyledTableCell>Ledger</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell> createdDate</StyledTableCell>
              <StyledTableCell>Created By</StyledTableCell>
              <StyledTableCell>Submitted On</StyledTableCell>
              <StyledTableCell>Submitted By</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isAddingRow || isEditing) && (
              <TableRow>
                <TableCell style={{ width: '150px' }}>
                  <Select variant="standard" value={formData.transactionType} onChange={handleInputChange('transactionType')} style={inputStyle}>
                    {ttypOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
               
                <TextField
    variant="standard"
    type="datetime-local" // Updated to datetime-local
    value={formData.documentDate}
    onChange={handleInputChange('documentDate')}
    style={inputStyle}
    InputLabelProps={{
      shrink: true,
    }}
  />
                <TableCell>
                  <Input
                    id="year-input"
                    autoComplete="off"
                    style={{ width: '100px' }}
                    value={formData.year}
                    onChange={handleInputChange('year')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    id="period-input"
                    autoComplete="off"
                    style={{ width: '100px' }}
                    value={formData.period}
                    onChange={handleInputChange('period')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    id="reference-input"
                    autoComplete="off"
                    style={{ width: '200px' }}
                    value={formData.reference}
                    onChange={handleInputChange('reference')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    id="payment-project-input"
                    autoComplete="off"
                    style={{ width: '200px' }}
                    value={formData.paymentProject}
                    onChange={handleInputChange('paymentProject')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    id="receipt-project-input"
                    autoComplete="off"
                    style={{ width: '200px' }}
                    value={formData.receiptProject}
                    onChange={handleInputChange('receiptProject')}
                  />
                </TableCell>
                <TableCell>
                  <Select variant="standard" value={formData.ledger} onChange={handleInputChange('ledger')} style={inputStyle}>
                    {ledgerOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    style={{ width: '100px' }}
                    value={formData.amount}
                    onChange={handleInputChange('amount')}
                    step="0.01"
                    className="no-arrows"
                  />
                </TableCell>
                <TableCell>
                  <Select variant="standard" value={formData.status} onChange={handleInputChange('status')} style={inputStyle}>
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
  variant="standard"
  type="text"
  value={formData.createdDate}
  onChange={handleInputChange('createdDate')}
  style={inputStyle}
  InputLabelProps={{
    shrink: true,
  }}
/>


                </TableCell>
                <TableCell>
                  <Input
                    style={{ width: '100px' }}
                    value={formData.createdBy}
                    onChange={handleInputChange('createdBy')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
  variant="standard"
  type="text"
  value={formData.submittedOn}
  onChange={handleInputChange('submittedOn')}
  style={inputStyle}
  InputLabelProps={{
    shrink: true,
  }}
/>
                </TableCell>
                <TableCell>
                  <Input
                    style={{ width: '100px' }}
                    value={formData.submittedBy}
                    onChange={handleInputChange('submittedBy')}
                  />
                </TableCell>
                <TableCell style={{ display: 'flex' }}>
                  <Tooltip title="Save">
                    <IconButton aria-label="save" onClick={handleSaveClick} style={greyIconStyle}>
                      <SaveIcon style={smallIconStyle} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton aria-label="cancel" onClick={handleCancelClick} style={greyIconStyle}>
                      <CancelIcon style={smallIconStyle} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
            {displayedData.map((row, index) => (
              <TableRow key={index}>
                <NewTableCell>{row.transactionType}</NewTableCell>
               
                <NewTableCell>{row.documentDate}</NewTableCell>
                <NewTableCell>{row.year}</NewTableCell>
                <NewTableCell>{row.period}</NewTableCell>
                <NewTableCell>{row.reference}</NewTableCell>
                <NewTableCell>{row.paymentProject}</NewTableCell>
                <NewTableCell>{row.receiptProject}</NewTableCell>
                <NewTableCell>{row.ledger}</NewTableCell>
                <NewTableCell>{row.amount}</NewTableCell>
                <NewTableCell
                  style={{
                    textAlign: 'center',
                    color: row.status === 'Draft' ? 'red' : row.status === 'Submitted' ? 'blue' : 'inherit',
                    borderRadius: '5px',
                    padding: '5px',
                    height: '3px',
                    width: '5px',
                  }}
                >
                  {row.status}
                </NewTableCell>
                <NewTableCell>{row.createdDate}</NewTableCell>
                <NewTableCell>{row.createdBy}</NewTableCell>
                <NewTableCell>{row.submittedOn}</NewTableCell>
                <NewTableCell>{row.submittedBy}</NewTableCell>
                <NewTableCell style={{ display: 'flex' }}>
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit" onClick={() => handleEditClick(index)} style={greyIconStyle}>
                      <EditIcon style={smallIconStyle} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Duplicate">
                    <IconButton aria-label="duplicate" onClick={() => handleDuplicateClick(index)} style={greyIconStyle}>
                      <FileCopyIcon style={smallIconStyle} />
                    </IconButton>
                  </Tooltip>
                </NewTableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
  component="div"
  count={data.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
        </Table>
        

      </TableContainer>
    </div>
  );
}

export default Colevies;
