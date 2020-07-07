import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ImageIcon from '@material-ui/icons/Image';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useField } from '@kemsu/form';
import { withStyles } from "@material-ui/core/styles";
import { DragAndDropImageDialog as styles, DropImageIcon as useDropImageIconStyles, ValueImg as useValueImgStyles } from './styles';

function DropDocIcon({ onMouseOver }) {
  const classes = useDropImageIconStyles({ onMouseOver });
  return <ImageIcon className={classes.imageIcon} />;
}
DropDocIcon = React.memo(DropDocIcon);

function ValueDoc({ onMouseOver, src }) {
  const classes = useValueImgStyles({ onMouseOver });
  return <iframe src={src} className={classes.image} frameBorder="0" scrolling="no" />;
}
ValueDoc = React.memo(ValueDoc);

const documentTypes = [
  'application/pdf'
];

class DragAndDropPDFDialog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onMouseOver: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.clear = this.clear.bind(this);

    this.fileDialog = document.createElement('input');
    this.fileDialog.type = 'file';
    this.fileDialog.onchange = this.handleSelectFile;
  }

  assignSrc() {
    const { value } = this.props;
    if (value) {
      const { file, fileSourceKey } = value;
      if (file && this.file !== file) {
        this.file = file;
        this.src = URL.createObjectURL(file);
      }
      if (fileSourceKey) {
        this.src = '/files/' + fileSourceKey;
        this.file = null;
      }
    } else {
      this.src = null;
      this.file = null;
    }
    // if (!(value instanceof File)) {
    //   if (value && value instanceof Object) this.src = '/files/' + value.fileSourceKey;
    //   else this.src = null;
    //   this.file = null;
    // } else if (this.file !== value) {
    //   this.file = value;
    //   this.src = URL.createObjectURL(value);
    // }
  }

  handleMouseEnter(event) {
    event.preventDefault();
    event.stopPropagation(); // TODO: check if needed
    if (!this.state.onMouseOver) this.setState({ onMouseOver: true });
  }

  handleMouseLeave(event) {
    event.preventDefault();
    event.stopPropagation(); // TODO: check if needed
    if (this.state.onMouseOver) this.setState({ onMouseOver: false });
  }

  onClick(event) {    
    event.preventDefault();
    event.stopPropagation(); // TODO: check if needed
    this.fileDialog.click();
  }

  handleSelectFile(event) {
    event.preventDefault();
    const file = event.currentTarget.files[0];
    if (!file || !documentTypes.includes(file.type)) return;
    this.props.onChange?.({ file });
  }

  handleDragEnter(event) {
    event.preventDefault(); // TODO: check if needed
    event.stopPropagation(); // TODO: check if needed
    if (!this.state.onMouseOver) this.setState({ onMouseOver: true });
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation(); // TODO: check if needed
  }

  handleDragLeave(event) {
    event.preventDefault(); // TODO: check if needed
    event.stopPropagation(); // TODO: check if needed
    if (this.state.onMouseOver) this.setState({ onMouseOver: false });
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation(); // TODO: check if needed
    if (this.state.onMouseOver) this.setState({ onMouseOver: false });
    const file = event.dataTransfer.files[0];
    if (!file || !documentTypes.includes(file.type)) return;
    this.props.onChange?.({ file });
  }

  clear(event) {    
    event.preventDefault();
    event.stopPropagation(); // TODO: check if needed
    this.fileDialog.value = '';
    this.props.onChange?.(this.src ? null : undefined);
  }
  

  render() {
    const { classes, style: { width, height } = {}, className, label } = this.props;
    const { onMouseOver } = this.state;
    this.assignSrc();
    
    return <>
      <div className={classes.controls}>
        {label !== undefined && <Typography className={classes.label}>{label}</Typography>}
        <Tooltip title="Очистить документ">
          <IconButton onClick={this.clear} className={classes.clearButton}>
            <CloseIcon className={classes.clearIcon} />
          </IconButton>
        </Tooltip>
      </div>
      <Tooltip title="Перетащите нужный файл в данную область или щелкните по ней чтобы открыть диалог выбора файла">
        <div className={classes.root + ' ' + (className || '')}
          style={{ width, height }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.onClick}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          <div className={classes.imgContainer}>{
            this.src ? <ValueDoc src={this.src} onMouseOver={onMouseOver} />
            : <DropDocIcon onMouseOver={onMouseOver} />
          }</div>
        </div>
      </Tooltip>
    </>;
  }
}

DragAndDropPDFDialog = withStyles(styles)(DragAndDropPDFDialog);

const SelectProps = {
  handleValue(value) {
    return value;
  }
};

function DragAndDropPDFDialogInput({ comp, name, validate,
  helperText, label, style, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, SelectProps);
  const showError = touched && dirty && Boolean(error);

  return <div onBlur={onBlur} style={{ maxWidth: '400px', maxHeight: '400px', display: 'inline-block', ...style }} {...props}>
    <DragAndDropPDFDialog {...{ value, onChange, label }} />
    {(showError || helperText) && <FormHelperText error={showError}>{showError ? error : helperText}</FormHelperText>}
  </div>;
}

export default React.memo(DragAndDropPDFDialogInput);