import React, {useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Modal from '../templates/modal';
import Modal1 from '../templates/modal';
import Modal2 from '../templates/modal';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Work Name', width: '30%' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Work Title', width: '20%' },
  { id: 'hits', numeric: true, disablePadding: false, label: 'Available', width: '10%' },
  { id: 'reward', numeric: true, disablePadding: false, label: 'Reward', width: '10%' },
  { id: 'created', numeric: true, disablePadding: false, label: 'Time Allotted', width: '10%' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action', width: '15%' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell width="2%">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            width={headCell.width}
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
            // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const LoadData = () => {

}
export default function EnhancedTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalopen, setModalopen] = React.useState(false);
  const [modalopen1, setModalopen1] = React.useState(false);
  const [modalopen2, setModalopen2] = React.useState(false);
  const [reqid, setReqid] = React.useState('');
  const [reward, setReward] = React.useState('');
  const myInput = useRef();

  const onReject = (row) => {
    if (props.rejected >= 20) {
      setModalopen2(!modalopen2)
    }
    else if (props.rejected >= 10) {
      setModalopen1(!modalopen1)
      setReqid(row.requesterid)
      setReward(row.reward)
    }
    else {
      props.history.push({
        pathname: '/work1',
        state: { id: row.requesterid, reward: row.reward }
      })
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const clickRestart = () => {
    setModalopen(!modalopen)
  }
  const clickRestart1 = () => {
    setModalopen1(!modalopen1)
    if (modalopen1) props.history.push({
      pathname: '/work1',
      state: { id: reqid, reward: reward }
    })
  }
  const clickRestart2 = () => {
    setModalopen2(!modalopen2)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);
  const typingsuccess = (
    <div>
      <h3>Sorry, You are not qualified for this work now!</h3>
      <p style={{ fontSize: '14px' }}>Only workers with a minimum of 1000 completed works are qualified for this type of jobs.
      Once you finish 1000 assignments, After You  will be eligible for this opportunity.</p>      
    </div>
  )
  const typingsuccess1 = (
    <div>
      <p style={{ fontSize: '14px' }}>Greetings from Freelance-Typers,</p>
      <p style={{ fontSize: '14px' }}>We have reviewed all your works. We regret to inform you that you will not be permitted to work on Freelance Typers work platform due to poor quality of work submissions. Don’t worry In the future, you will be allowed to work again provided your work attains the desired quality of work.</p>
      <p style={{ fontSize: '14px' }}>Thank you!</p>
    </div>
  )
  const typingsuccess2 = (
    <div>
      <h2>Freelance-Typers Affiliate program.</h2>
      <p style={{ fontSize: '14px' }}>Greetings from Freelance-Typers,</p>
      <p style={{ fontSize: '14px' }}>Freelance Typers will now allow you to earn more money by using Freelance Typers  Affiliate program. You can now earn 20% of every referral worker’s income you have referred, for example if your referral worker earns and transfers $200 a day, you will receive $40 as your referral bonus. </p>
      <p style={{ fontSize: '14px' }}>For more earning, refer our website to good quality workers and earn more bonus money by using our Freelance Typers Affiliate program.</p>
      <a href={"/#workerID=" + props.workerid} > Click here to get Affiliate link</a>
      <div className="row ml-4 mb-4 text-center">
							{/* <div className="col-2" style={{ cursor: 'default' }}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{' '}{count} Like</div>
							<div className="col-2" style={{ cursor: 'default' }}><i className="fa fa-share-alt" aria-hidden="true"></i>{' '}{count - 8849} Share</div>
							<div className="col-2" style={{ cursor: 'default' }}><i className="fa fa-television" aria-hidden="true"></i>{' '}{count + 7464} Views</div> */}
							<div className="col-12">
								<div ref={myInput} className="a2a_kit a2a_kit_size_32 a2a_default_style text-right" data-a2a-url={"https://freelancetypers.com/#workerID=" + props.workerid} data-a2a-title="FreelanceTypers - Work from home">
									<a className="a2a_dd" href="https://www.addtoany.com/share"></a>
									<a className="a2a_button_facebook"></a>
									<a className="a2a_button_twitter"></a>
									<a className="a2a_button_email"></a>
									<a className="a2a_button_whatsapp"></a>
									<a className="a2a_button_linkedin"></a>
									<a className="a2a_button_telegram"></a>
									<a className="a2a_button_skype"></a>
									<a className="a2a_button_google_gmail"></a>
								</div>
							</div>
						</div>
    </div>
  )

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col-6">
          <h3 className="text-orange f-normal mb-4" style={{ fontSize: '2em' }}>Work Groups</h3>
        </div>
        <div className="col-6">
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={props.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
          <div className="pagenumber">
            1-10 of 234 &nbsp;&nbsp;
          <i className="fa fa-angle-left fa-md" aria-hidden="true" disabled></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa fa-angle-right" aria-hidden="true" onClick={() => { setModalopen(true) }}></i>&nbsp;&nbsp;&nbsp;
          {modalopen ? <Modal open={true} button2='Close' clickButton2={clickRestart} modalheader="Alert Message" modalbody={typingsuccess2} /> : ''}
            {modalopen1 ? <Modal1 open={true} button2='Close' clickButton2={clickRestart1} modalheader="Warning" modalbody={typingsuccess1} /> : ''}
            {modalopen2 ? <Modal2 open={true} button2='Close' clickButton2={clickRestart2} modalheader="Warning" modalbody={typingsuccess2} /> : ''}
          </div>
        </div>

      </div>

      <Paper className={classes.paper}>

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell style={{ paddingLeft: '1em !important' }}>
                          {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton> */}
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell align="center">{row.hits}</TableCell>
                        <TableCell align="center">${(Math.round(row.reward * 100) / 100).toFixed(2)}</TableCell>
                        <TableCell align="center">{row.TimeAllotted}</TableCell>
                        <TableCell align="center">
                          {index < 2 ? (<div><a href="#">{row.action}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="amazonbutton" onClick={() => onReject(row)}>{row.actionbutton}</button></div>) :
                            (<div><img src="assets/img/lock.png" />&nbsp;&nbsp;<button className="amazonbutton" onClick={() => { setModalopen(true) }}>Click & Start Work</button></div>)}
                        </TableCell>
                      </TableRow>
                      <td colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Typography variant="h6" gutterBottom component="div">
                            <div className="row">

                              <div className="col-6">
                                <p>Description</p>
                                <p>Description</p>
                              </div>

                              <div className="col-6">
                                <p>Time Allotted</p>
                                <p>60Min</p>
                              </div>

                              <div className="col-6">
                              </div>

                              <div className="col-6">
                                <p>Expires</p>
                                <p>12/12/2020</p>
                              </div>

                            </div>

                          </Typography>

                          <Table size="small" aria-label="purchases">
                            <TableHead>

                            </TableHead>

                          </Table>
                        </Collapse>
                      </td>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagenumber" style={{ paddingBottom: '10px' }}>
          1-10 of 234 &nbsp;&nbsp;
          <i className="fa fa-angle-left fa-md" aria-hidden="true" disabled></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa fa-angle-right" aria-hidden="true" onClick={() => { setModalopen(true) }}></i>&nbsp;&nbsp;&nbsp;
          </div>
      </Paper>

    </div>
  );
}