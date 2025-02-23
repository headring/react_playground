import "./module.css";

export const metadata = {
  title: "NextGram",
  description:
    "A sample Next.js app showing dynamic routing with modals as a route.",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {props.children}
      {props.modal}
      <div id="modal-root" />
    </div>
  );
}
