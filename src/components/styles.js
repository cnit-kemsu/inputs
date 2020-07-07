import { makeStyles } from "@material-ui/core/styles";

export const DragAndDropImageDialog = {
  root: {
    width: '100%',
    height: 'calc(100% - 32px)',
    backgroundColor: '#ccc',
    cursor: 'pointer',
    border: '4px solid #ccc',
    boxSizing: 'border-box'
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  clearButton: {
    float: 'right',
    width: '20px',
    height: '20px',
    //marginRight: '-12px',
    alignItems: 'baseline'
  },
  clearIcon: {
    float: 'right',
    marginTop: '-10px',
    width: '20px',
    height: '20px'
  },
  label: {
    float: 'left'
  },
  controls: {
    display: 'inline-block',
    width: '100%'
  }
};

export const DropImageIcon = makeStyles({
  imageIcon: ({ onMouseOver }) => ({
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    color: onMouseOver ? '#777' : '#999',
  })
});

export const ValueImg = makeStyles({
  image: ({ onMouseOver }) => ({
    // maxWidth: '100%',
    // maxHeight: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: onMouseOver ? '0.5' : '1'
  })
});