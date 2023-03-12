import '../bootstrap.min.css';

export default function FloatingButton(props) {
    let {content, onClick} = props;
    return (
        <div className="container">
            <button className="btn btn-primary rounded-circle position-fixed p-3" style={{right: '5%', bottom: '5%', fontSize: '2rem'}} onClick={onClick}>{content}</button>
        </div>
    );
}