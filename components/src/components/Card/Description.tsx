interface DescriptionProps {
  description?: string;
  title: string;
}

const container = {
  display: 'flex',
};

const titleStyle = {
  width: 100,
  fontSize: 14,
  fontWeight: 700,
  marginBottom: 0,
  marginTop: 2,
};

const text = {
  width: 260,
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 400,
  marginBottom: 0,
  marginTop: 2,
};

const Description = ({ description, title }: DescriptionProps) => {
  return (
    <div style={container}>
      <h4 style={titleStyle}>{title}</h4>
      <p style={text}>{description}</p>
    </div>
  );
};

export default Description;
