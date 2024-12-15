import './styles/Logo.css'

const Logo = ({logo}) => {
    return (
        <div className="conancos-logo-container">
            <img
                src={logo}
                className="conancos-logo"
                alt="logo"
            />
        </div>
    )
}

export default Logo