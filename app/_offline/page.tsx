function OfflinePage() {
    return (
        <main style={{
            minHeight: "60vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
        }}>
            <section style={{
                maxWidth: "32rem",
                textAlign: "center",
                display: "grid",
                gap: "1rem",
            }}>
                <h1>You&apos;re offline</h1>
                <p>
                    The app shell is available, but this page needs a network connection to load fresh
                    content. Please reconnect and try again.
                </p>
            </section>
        </main>
    );
}

export default OfflinePage;
