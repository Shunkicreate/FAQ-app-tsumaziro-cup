import ShowFlow from '../../front/src/components/ShowFlow'

export default {
  title: 'Components/ShowFlow',
  component: ShowFlow,
  tags: ['autodocs'],
};

export const Simple = {
  args: {
    nodes: [
      { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
      { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
    ],
  },
};
