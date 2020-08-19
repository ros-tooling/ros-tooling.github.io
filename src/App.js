import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table';

const latest_packages = {
  "ros-tooling/action-amazon-chime": {},
  "ros-tooling/action-cloudwatch-metrics": {},
  "ros-tooling/action-pypi": {},
  "ros-tooling/action-repository-activity": {},
  "ros-tooling/action-ros-ci": {},
  "ros-tooling/action-ros-ci-template": {},
  "ros-tooling/action-ros-lint": {},
  "ros-tooling/cross_compile": {},
  "ros-tooling/github-contribution-report-generator": {},
  "ros-tooling/launch_ros_sandbox": {},
  "ros-tooling/libstatistics_collector": {},
  "ros-tooling/setup-ros": {},
  "ros-tooling/setup-ros-docker": {},
  "ros-tooling/system_metrics_collector": {},
  "ros2/rosbag2": {},
  "ros2/rosbag2_bag_v2": {},
};

const dashing_packages = ["cross_compile", "rosbag2", "rosbag2_bag_v2_plugins"];
const eloquent_packages = ["cross_compile", "rosbag2", "rosbag2_bag_v2_plugins"];
const foxy_packages = ["libstatistics_collector", "rosbag2", "rosbag2_bag_v2_plugins", "system_metrics_collector"];

const ros_distro_to_ubuntu_distro = {
  "dashing": "bionic",
  "eloquent": "bionic",
  "foxy": "focal",
};

function RepoLink({ name }) {
  return (
    <a href={`https://github.com/${name}`}>{name}</a>
  );
}

function ActionLink({name}) {
  const repo = name.split('/')[1];
  return (
    <a href={`https://github.com/${name}/actions`}>
      <img src={`https://github.com/${name}/workflows/Test%20${repo}/badge.svg`} alt="test status badge" />
    </a>
  );
}

function CodecovLink({ name }) {
  return (
    <a href={`https://codecov.io/gh/${name}`}>
      <img src={`https://codecov.io/gh/${name}/branch/master/graph/badge.svg`} alt="codecov badge" />
    </a>
  );
}

function IssuesLink({ name }) {
  return (
    <a href={`https://github.com/${name}/issues`}>
      <img src={`https://img.shields.io/github/issues/${name}`} alt="issue count badge" />
    </a>
  );
}

function PRsLink({ name }) {
  return (
    <a href={`https://github.com/${name}/issues`}>
      <img src={`https://img.shields.io/github/issues-pr/${name}`} alt="PR count badge" />
    </a>
  );
}

function DevelopmentStatusTable() {
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Repository</th>
        <th>Latest</th>
        <th>Nightly</th>
        <th>Coverage</th>
        <th>Issues</th>
        <th>PRs</th>
      </tr>
    </thead>
    <tbody>
      {
        Object.keys(latest_packages).map(p =>
          <tr key={p}>
            <td><RepoLink name={p} /></td>
            <td><ActionLink name={p} /></td>
            <td>N/A</td>
            <td><CodecovLink name={p} /></td>
            <td><IssuesLink name={p} /></td>
            <td><PRsLink name={p} /></td>
          </tr>
        )
      }
      </tbody>
    </Table>
  );
}

function Ros2BuildIcon({ distro, pkg, build_type }) {
  // For reference
  // Ddev
  // Dsrc_uB
  // Dbin_uB64
  // Dbin_ubv8_uBv8
  // Dbin_ubhf_uBhf
  // Fbin_ubv8_uFv8
  const initial = distro[0].toUpperCase();
  const ubuntu_distro = ros_distro_to_ubuntu_distro[distro];
  const ubuntu_initial = ubuntu_distro[0].toUpperCase();
  let short_tag = ``;
  let long_tag = ``;
  switch (build_type) {
    case "dev":
      short_tag = `${initial}dev`;
      long_tag = `ubuntu_${ubuntu_distro}_amd64`;
      break;
    case "src":
      short_tag = `${initial}src_u${ubuntu_initial}`;
      long_tag = `ubuntu_${ubuntu_distro}__source`;
      break;
    case "x86_64":
      short_tag = `${initial}bin_u${ubuntu_initial}64`;
      long_tag = `ubuntu_${ubuntu_distro}_amd64__binary`;
      break;
    case "aarch64":
      short_tag = `${initial}bin_ubv8_u${ubuntu_initial}v8`;
      long_tag = `ubuntu_${ubuntu_distro}_arm64__binary`;
      break;
    case "armhf":
      short_tag = `${initial}bin_ubhf_u${ubuntu_initial}hf`;
      long_tag = `ubuntu_${ubuntu_distro}_armhf__binary`;
      break;
    default:
      break;
  }

  const build_url = `http://build.ros2.org/view/${short_tag}/job/${short_tag}__${pkg}__${long_tag}`;
  return (
    <a href={build_url}>
      <img src={`${build_url}/badge/icon`} alt="build.ros2.org badge" />
    </a>
  )
}

function DistroReleaseTable({ distro, packages }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Package</th>
          <th>dev</th>
          <th>src</th>
          <th>x86_64</th>
          <th>aarch64</th>
          <th>armhf</th>
        </tr>
      </thead>
      <tbody>
      {
        packages.map(p =>
          <tr key={p}>
            <td>{p}</td>
            <td><Ros2BuildIcon distro={distro} pkg={p} build_type="dev" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={p} build_type="src" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={p} build_type="x86_64" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={p} build_type="aarch64" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={p} build_type="armhf" /></td>
          </tr>
        )
      }
      </tbody>
    </Table>
  );
}

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>ROS 2 Tooling Working Group Dashboard</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <h1>Projects Development Status</h1>
          <DevelopmentStatusTable />
        </Row>
        <Row>
          <h1> Released Packages - Foxy Fitzroy</h1>
          <DistroReleaseTable distro="foxy" packages={foxy_packages} />
        </Row>
        <Row>
          <h1>Released Packages - Eloquent Elusor</h1>
          <DistroReleaseTable distro="eloquent" packages={eloquent_packages} />
        </Row>
        <Row>
          <h1>Released Packages - Dashing Diademata</h1>
          <DistroReleaseTable distro="dashing" packages={dashing_packages} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
