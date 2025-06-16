/* eslint-disable no-console */
import cn from 'classnames';

import { useState } from 'react';
import { User } from '../entities/User';

type Props = {
  users: User[] | null;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isShown, setIsShown] = useState(false);

  const toggleShowDropdown = () => {
    setIsShown(curr => !curr);
  };

  const handleSelectButton = (user: User) => {
    setSelectedUser(user);
    setIsShown(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleShowDropdown}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isShown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users?.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleSelectButton(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
