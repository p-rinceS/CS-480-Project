import './LoadingSpinner.css';

const LoadingSpinner = ({loading}) => {
    return (<>{loading && (
        <div className='loading-spinner'></div>
    )
    }</>);
}

export default LoadingSpinner;