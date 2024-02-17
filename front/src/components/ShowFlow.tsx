import ReactFlow from 'reactflow';

import 'reactflow/dist/style.css';

interface ShowFlowProps {
    nodes: Array<{ id: string; position: { x: number; y: number }; data: { label: string } }>;
    edges: Array<{ id: string; source: string; target: string }>;
}

const ShowFlow = (props: ShowFlowProps): JSX.Element => {
    const { nodes, edges } = props;
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} />
        </div>
    );
}

export default ShowFlow;