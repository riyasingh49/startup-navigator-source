import type { FormEvent } from "react";

export function LoginCard({
  title,
  email,
  password,
  onClick,
}: {
  title: string;
  email: string;
  password: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-3 text-sm font-semibold text-[#4d5d55]">Email: {email}</p>
      <p className="mt-1 text-sm font-semibold text-[#4d5d55]">Password: {password}</p>
      <button onClick={onClick} className="mt-5 rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
        Continue as {title.replace(" login", "")}
      </button>
    </div>
  );
}

export function AdminLoginCard({
  adminPassword,
  adminError,
  setAdminPassword,
  onSubmit,
}: {
  adminPassword: string;
  adminError: string;
  setAdminPassword: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Admin login</h2>
      <p className="mt-3 text-sm font-semibold text-[#4d5d55]">
        Email: admin@startupnavigator.com
      </p>
      <label className="mt-4 block text-sm font-black">
        Password
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          placeholder="Enter admin password"
          className="mt-2 block w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm font-normal outline-none focus:border-[#153b37]"
        />
      </label>
      {adminError && <p className="mt-3 text-sm font-bold text-[#a84632]">{adminError}</p>}
      <button className="mt-5 rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
        Open Admin Dashboard
      </button>
      <p className="mt-3 text-xs font-semibold text-[#65736b]">Demo password: admin123</p>
    </form>
  );
}

export function AdminPasswordPanel({
  adminPassword,
  adminError,
  setAdminPassword,
  onSubmit,
}: {
  adminPassword: string;
  adminError: string;
  setAdminPassword: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl rounded border border-[#d8ded4] bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-black">Admin access required</h2>
      <p className="mt-3 leading-7 text-[#4d5d55]">
        Enter the admin password to open the dashboard where articles and resources can be managed.
      </p>
      <label className="mt-5 block text-sm font-black">
        Admin password
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          placeholder="Enter admin password"
          className="mt-2 block w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm font-normal outline-none focus:border-[#153b37]"
        />
      </label>
      {adminError && <p className="mt-3 text-sm font-bold text-[#a84632]">{adminError}</p>}
      <button className="mt-5 w-full rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
        Unlock Admin Dashboard
      </button>
      <p className="mt-3 text-xs font-semibold text-[#65736b]">Demo password: admin123</p>
    </form>
  );
}
