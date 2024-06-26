'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSelectedPartFromURL } from '../utils/util';
import { useAppDispatch, useAppSelector } from '@/custom-hooks/StateHooks';
import { RootState } from '@/store/store';
import { tabLink } from '../utils/util';
import { Tooltip } from '@mui/material';
import TransactionSuccessPopup from './TransactionSuccessPopup';

import {
  GITHUB_ISSUES_PAGE_LINK,
  HELP_ICON,
  REPORT_ICON,
  SIDENAV_MENU_ITEMS,
  TELEGRAM_LINK,
  TWITTER_ICON,
  TWITTER_LINK,
} from '@/utils/constants';
// import useInitAuthz from '@/custom-hooks/useInitAuthz';
// import useInitFeegrant from '@/custom-hooks/useInitFeegrant';
import {
  getAllTokensPrice,
  setAllNetworksInfo,
} from '@/store/features/common/commonSlice';
import IBCSwapTxStatus from './IBCSwapTxStatus';
import MoreOptions from './MoreOptions';

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const pathParts = pathName.split('/');
  const selectedPart = getSelectedPartFromURL(pathParts).toLowerCase();
  // useInitAuthz();
  // useInitFeegrant();
  const isAuthzMode = useAppSelector((state) => state.authz.authzModeEnabled);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setAllNetworksInfo());
    dispatch(getAllTokensPrice());
  }, []);

  return (
    <div className="main">
      <TransactionSuccessPopup />
      <IBCSwapTxStatus />

      <div className="sidebar">
        <Link href="/">
          <Image src="/vitwit-logo.png" height={30} width={55} alt="Resolute" />
        </Link>
        <div className="flex flex-col gap-4 items-center">
          {SIDENAV_MENU_ITEMS.defaultOptions.map((item) => (
            <MenuItem
              key={item.name}
              pathName={selectedPart}
              itemName={item.name}
              icon={item.icon}
              activeIcon={item.activeIcon}
              link={item.link}
              authzSupport={!isAuthzMode || item.authzSupported}
              metamaskSupport={item.isMetaMaskSupports}
            />
          ))}
          <MoreOptions />
        </div>
        <div className="flex flex-col gap-4">
          <Tooltip title="Report an issue" placement="right">
            <Link href={GITHUB_ISSUES_PAGE_LINK} target="_blank">
              <div className="sidebar-menu-item">
                <Image
                  src={REPORT_ICON}
                  height={40}
                  width={40}
                  alt="Resolute"
                />
              </div>
            </Link>
          </Tooltip>
          <Tooltip title="Need help?" placement="right">
            <Link href={TELEGRAM_LINK} target="_blank">
              <div className="sidebar-menu-item">
                <Image src={HELP_ICON} height={40} width={40} alt="Resolute" />
              </div>
            </Link>
          </Tooltip>
          <Tooltip title="Twitter" placement="right">
            <Link href={TWITTER_LINK} target="_blank">
              <div className="sidebar-menu-item">
                <Image
                  src={TWITTER_ICON}
                  height={19}
                  width={19}
                  alt="Resolute"
                />
              </div>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SideBar;

const MenuItem = ({
  pathName,
  itemName,
  icon,
  activeIcon,
  link,
  authzSupport,
  metamaskSupport,
}: {
  pathName: string;
  itemName: string;
  icon: string;
  activeIcon: string;
  link: string;
  authzSupport: boolean;
  metamaskSupport: boolean;
}) => {
  // Here when the url(pathName) includes validator,
  // we are setting the module to staking (to highlight the staking module)
  const path =
    pathName === 'overview'
      ? '/'
      : pathName === 'validator'
        ? '/staking'
        : `/${pathName}`;
  const selectedNetwork = useAppSelector(
    (state: RootState) => state.common.selectedNetwork.chainName
  );

  const isMetamaskSupported = () =>
    metamaskSupport || localStorage.getItem('WALLET_NAME') !== 'metamask';

  return (
    <Link
      href={
        isMetamaskSupported() === false
          ? ''
          : authzSupport
            ? tabLink(link, selectedNetwork)
            : ''
      }
    >
      <Tooltip
        className={
          isMetamaskSupported() === false
            ? 'cursor-not-allowed'
            : authzSupport
              ? ''
              : 'cursor-not-allowed'
        }
        title={
          isMetamaskSupported() === false
            ? "MetaMask doesn't support " + itemName
            : authzSupport
              ? itemName
              : 'authz mode is not supported for ' + itemName
        }
        placement="right"
      >
        <div
          className={`sidebar-menu-item ${
            path === link ? 'sidebar-menu-item-selected' : ''
          }`}
        >
          <div>
            <Image
              src={path === link ? activeIcon : icon}
              height={link.includes('cosmwasm') ? 32 : 45}
              width={link.includes('cosmwasm') ? 32 : 45}
              alt={itemName}
            />
          </div>
        </div>
      </Tooltip>
    </Link>
  );
};
