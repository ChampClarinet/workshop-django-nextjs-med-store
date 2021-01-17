import '../../styles/_overlay.module.scss';

interface IProps {
    displayOverlay: boolean;
    onClick?: () => any;
}
export default function Overlay({ displayOverlay, onClick }: IProps) {
    return (
        <div
            className="overlay"
            onClick={onClick}
            style={{
                display: displayOverlay ? 'block' : 'none',
                transition: '.5s',
            }} />
    );
}