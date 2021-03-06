import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartList from './../ShoppingCartList';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
  });
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };
  
  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
      
    const icons = {
      1: <ShoppingCartIcon />,
      2: <LocalShippingIcon />,
      3: <PaymentIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  
  function getSteps() {
    return ['Shopping Cart', 'Shipping', 'Payment'];
  }
  

 const CheckoutDialog = (props) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    function getStepContent(step) {
      switch (step) {
        case 0:
          return <ShoppingCartList shoppingCart={props.shoppingCart} deleteCartItem={props.deleteCartItem}></ShoppingCartList>;
        case 1:
          return (
          <form style={{margin: '32px 16px', marginTop: 16}} noValidate autoComplete="off">
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={6}>
                <TextField fullWidth label="First Name" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Last Name" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address Line" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="City" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Province" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Postal Code" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Country" />
              </Grid>
            </Grid>
          </form>
          )
          ;
        case 2:
          return (
            <form style={{margin: '32px 16px', marginTop: 16}} noValidate autoComplete="off">
              <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={6}>
                  <TextField fullWidth label="Name on Card" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Card Number" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Expiry Date" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="CVV" />
                </Grid>
              </Grid>
          </form>
          );
        default:
          return 'Unknown step';
      }
    }

  return (
    <div >
      <Dialog fullWidth open={props.checkoutDialogIsOpen} onClose={props.closeCheckoutDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
        <DialogContent>
            <div className={classes.root}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                            Reset
                            </Button>
                        </div>
                    ) : (
                    <div>
                      <Divider></Divider>
                      {getStepContent(activeStep)}
                      <Divider style={{marginBottom: '8px'}}></Divider>
                        <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            disabled={props.shoppingCart.length === 0}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default CheckoutDialog;