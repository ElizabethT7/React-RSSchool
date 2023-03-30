import { Component } from 'react';

interface DescriptionProps {
  description: string;
  title: string;
}

const container = {
  display: 'flex',
};

const title = {
  width: 100,
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 0,
  marginTop: 2,
};

const text = {
  width: 260,
  fontSize: 12,
  lineHeight: 1.4,
  fontWeight: 400,
  marginBottom: 0,
  marginTop: 2,
};

class Description extends Component<DescriptionProps> {
  constructor(props: DescriptionProps) {
    super(props);
  }
  render() {
    return (
      <div style={container}>
        <h4 style={title}>{this.props.title}</h4>
        <p style={text}>{this.props.description}</p>
      </div>
    );
  }
}

export default Description;
