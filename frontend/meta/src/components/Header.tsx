type Props = {
  title: string;
}

export default ({ title }: Props) => {
  return (
    <div className="header" style={{fontSize: 20, display: 'flex', flex: 1, justifyContent: 'center', marginBottom: 30}}>
      <span className="h3">{title}</span>
    </div>
  )
}