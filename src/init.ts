import './style.css';
import init from './scripts/main';

const container = document.getElementById('container') as HTMLDivElement | null;

if (container !== null) { init(container) }
else { throw new Error('container not found') };