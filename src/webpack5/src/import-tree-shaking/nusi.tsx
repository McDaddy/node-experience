import * as React from 'react';
import {
  Popover as NusiPopover,
  Modal as NusiModal,
  Toast,
  notification,
  Checkbox,
  FooterBar,
  Button,
  Table,
  Select,
  Tooltip as NusiTooltip,
  Spin,
  Panel,
  Container,
  Title,
  ConfigProvider,
  Drawer as NusiDrawer,
  Icon,
  Badge,
  Empty,
  Divider,
  Card,
  InputNumber,
  Input,
  Dropdown as NusiDropdown,
  Menu,
  Row,
  Col,
  Tabs,
  DatePicker as NusiDatePicker,
  Switch,
  FormBuilder,
  Cascader,
  Layout,
  Radio,
  TreeSelect as NusiTreeSelect,
  Category,
  Upload,
  Tag,
  Breadcrumb,
  Form,
  BarChart,
  LineChart,
  PageHeader,
  Collapse,
  Alert,
  Search,
  Shell,
  Steps,
  Tree,
  Avatar,
  Filter,
  Pagination,
} from '@terminus/nusi';

export {
  Popover,
  Modal,
  Checkbox,
  FooterBar,
  Button,
  Table,
  Select,
  Tooltip,
  Toast,
  Spin,
  Panel,
  Container,
  Title,
  ConfigProvider,
  Drawer,
  Icon,
  Badge,
  Empty,
  Divider,
  Card,
  InputNumber,
  Input,
  Dropdown,
  Menu,
  Row,
  Col,
  Tabs,
  DatePicker,
  Switch,
  FormBuilder,
  Cascader,
  Layout,
  notification,
  Radio,
  TreeSelect,
  Category,
  Upload,
  Tag,
  Breadcrumb,
  Form,
  BarChart,
  LineChart,
  PageHeader,
  Collapse,
  Alert,
  Search,
  Shell,
  Steps,
  Tree,
  Avatar,
  Filter,
  Pagination,
};

function withSetContainer<T extends React.ComponentType<any>>(WrappedComponent: T, containerType?: string): T {
  const hoc = (props: any) => {
    if (containerType === 'popup') {
      return <WrappedComponent getPopupContainer={() => document.getElementById('fdp-content')} {...props} />;
    }
    if (containerType === 'calendar') {
      return <WrappedComponent getCalendarContainer={() => document.getElementById('fdp-content')} {...props} />;
    }
    return <WrappedComponent getContainer={() => document.getElementById('fdp-content')} {...props} />;
  };
  return hoc as T;
}

const Modal = withSetContainer(NusiModal);
const Popover = withSetContainer(NusiPopover, 'popup');
const Dropdown = withSetContainer(NusiDropdown, 'popup');
const DatePicker = withSetContainer(NusiDatePicker, 'calendar');
const Drawer = withSetContainer(NusiDrawer);
const Tooltip = withSetContainer(NusiTooltip, 'popup');
const TreeSelect = withSetContainer(NusiTreeSelect, 'popup');

DatePicker.MonthPicker = withSetContainer(NusiDatePicker.MonthPicker, 'calendar');
DatePicker.RangePicker = withSetContainer(NusiDatePicker.RangePicker, 'calendar');
DatePicker.MonthRangePicker = withSetContainer(NusiDatePicker.MonthRangePicker, 'calendar');
DatePicker.WeekPicker = withSetContainer(NusiDatePicker.WeekPicker, 'calendar');
DatePicker.QuarterPicker = withSetContainer(NusiDatePicker.QuarterPicker, 'calendar');

Modal.confirm = NusiModal.confirm;
Modal.warning = NusiModal.warning;
Modal.error = NusiModal.error;
Modal.warning = NusiModal.warning;
Modal.info = NusiModal.info;
