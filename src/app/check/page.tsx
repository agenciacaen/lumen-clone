export const runtime = 'edge';

export default function CheckPage() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>✅ Sistema de Roteamento Cloudflare está Funcionando</h1>
            <p>Se você está vendo esta página, o deploy e o roteamento básico estão OK.</p>
            <p>Hora: {new Date().toISOString()}</p>
        </div>
    );
}
