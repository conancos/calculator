import './styles/Panel.css'

const Panel = ({memo, memory, input}) => {
    
    return (
        <div className="panel">
            <input id="memo" className="memo" value={memo} disabled placeholder='M'/>
            <input id="memory" className="little-panel" value={memory} disabled placeholder='0'/>
            <input id="display" className="main-panel" value={input} onChange={(event) => setInput(event.target.value)} disabled placeholder='0'/>
        </div>
    );
}

export default Panel