import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { NextResponse } from "next/server";
import React from "react";
import { Home, User } from "lucide-react";
import { useNotifications } from "./Notifications";

function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotifications();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      return NextResponse.json(showNotification("Failed to sign Out", "error"));
    }
  };

  return (
    <div className="navbar bg-inherit z-50 sticky shadow-2xl top-0 rounded-lg mb-5">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
          >
            ReelsPro
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-5">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-7 h-7" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
              >
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-lg font-semibold opacity-70">
                        Hi, {session.user?.name}
                      </span>
                    </li>
                    <div className="divider my-1"></div>

                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                      >
                        Upload new Reel
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
