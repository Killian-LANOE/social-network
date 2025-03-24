import ConnectionForm from "../components/ConnectionForm";
function Connection() {
  return (
    <main className="h-screen w-screen flex items-center justify-center ">
      <section className="h-1/2 w-1/4 border-2 border-black flex justify-center">
        <ConnectionForm />
      </section>
    </main>
  );
}

export default Connection;
