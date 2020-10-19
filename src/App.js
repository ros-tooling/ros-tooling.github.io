import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table';

const latest_packages = {
  "ros-tooling/action-amazon-chime": {"no_codecov": true},
  "ros-tooling/action-cloudwatch-metrics": {"no_codecov": true},
  "ros-tooling/action-pypi": {"no_codecov": true},
  "ros-tooling/action-repository-activity": {},
  "ros-tooling/action-ros-ci": {},
  "ros-tooling/action-ros-ci-template": {"no_latest_test": true, "no_codecov": true},
  "ros-tooling/action-ros-lint": {},
  "ros-tooling/cross_compile": {"nightly_workflow": "End-to-end Testing (Nightly)"},
  "ros-tooling/github-contribution-report-generator": {},
  "ros-tooling/launch_ros_sandbox": {},
  "ros-tooling/libstatistics_collector": {},
  "ros-tooling/setup-ros": {},
  "ros-tooling/setup-ros-docker": {"workflow_override": "Build Docker image", "no_codecov": true},
  "ros-tooling/system_metrics_collector": {"nightly_workflow": "End-to-end Testing (Nightly)"},
  "ros2/rosbag2": {"no_codecov": true},
  "ros2/rosbag2_bag_v2": {"no_codecov": true},
};

const dashing_packages = {
  "ros2bag": {'no_dev_build': true},
  "rosbag2": {},
  "rosbag2_converter_default_plugins": {'no_dev_build': true},
  "rosbag2_storage": {'no_dev_build': true},
  "rosbag2_storage_default_plugins": {'no_dev_build': true},
  "rosbag2_test_common": {'no_dev_build': true},
  "rosbag2_tests": {'no_dev_build': true},
  "rosbag2_transport": {'no_dev_build': true},
  "shared_queues_vendor": {'no_dev_build': true},
  "sqlite3_vendor": {'no_dev_build': true},
  "ros1_rosbag_storage_vendor": {'no_dev_build': true},
  "rosbag2_bag_v2_plugins": {'no_dev_build': true},
};

const eloquent_packages = {
  "ros2bag": {'no_dev_build': true},
  "rosbag2": {},
  "rosbag2_converter_default_plugins": {'no_dev_build': true},
  "rosbag2_storage": {'no_dev_build': true},
  "rosbag2_storage_default_plugins": {'no_dev_build': true},
  "rosbag2_test_common": {'no_dev_build': true},
  "rosbag2_tests": {'no_dev_build': true},
  "rosbag2_transport": {'no_dev_build': true},
  "shared_queues_vendor": {'no_dev_build': true},
  "sqlite3_vendor": {'no_dev_build': true},
  "ros1_rosbag_storage_vendor": {'no_dev_build': true},
  "rosbag2_bag_v2_plugins": {'no_dev_build': true},
};

const foxy_packages = {
  "ros2bag": {"no_dev_build": true},
  "rosbag2": {},
  "rosbag2_compression": {"no_dev_build": true},
  "rosbag2_converter_default_plugins": {"no_dev_build": true},
  "rosbag2_cpp": {"no_dev_build": true},
  "rosbag2_storage": {"no_dev_build": true},
  "rosbag2_storage_default_plugins": {"no_dev_build": true},
  "rosbag2_test_common": {"no_dev_build": true},
  "rosbag2_tests": {"no_dev_build": true},
  "rosbag2_transport": {"no_dev_build": true},
  "shared_queues_vendor": {"no_dev_build": true},
  "sqlite3_vendor": {"no_dev_build": true},
  "zstd_vendor": {"no_dev_build": true},
  "ros1_rosbag_storage_vendor": {"no_dev_build": true},
  "rosbag2_bag_v2_plugins": {"no_dev_build": true},
  "libstatistics_collector": {},
  "system_metrics_collector": {},
};

const ros_distro_to_ubuntu_distro = {
  "dashing": "bionic",
  "eloquent": "bionic",
  "foxy": "focal",
};

const Empty = (
  <p>N/A</p>
);

function sanitize(url_component) {
  return url_component.replace(" ", "%20");
}


function RepoLink({ name }) {
  return (
    <a href={`https://github.com/${name}`}>{name}</a>
  );
}

function ActionLink({name, config}) {
  if (config.no_latest_test) {
    return Empty;
  }
  const repo = name.split('/')[1];
  let workflow = `Test ${repo}`;
  if (config.workflow_override) {
    workflow = config.workflow_override;
  }
  workflow = sanitize(workflow);
  return (
    <a href={`https://github.com/${name}/actions`}>
      <img src={`https://github.com/${name}/workflows/${workflow}/badge.svg`} alt="test status badge" />
    </a>
  );
}

function NightlyActionLink({ name, config }) {
  if (!config.nightly_workflow) {
    return Empty;
  }
  return(
    <a href={`https://github.com/${name}/actions`}>
      <img src={`https://github.com/${name}/workflows/${sanitize(config.nightly_workflow)}/badge.svg`} alt="test status badge" />
    </a>
  );
}

function CodecovLink({ name, config }) {
  if (config.no_codecov) {
    return Empty;
  }
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
        Object.entries(latest_packages).map(([name, config]) =>
          <tr key={name}>
            <td><RepoLink name={name} /></td>
            <td><ActionLink name={name} config={config} /></td>
            <td><NightlyActionLink name={name} config={config} /></td>
            <td><CodecovLink name={name} config={config} /></td>
            <td><IssuesLink name={name} /></td>
            <td><PRsLink name={name} /></td>
          </tr>
        )
      }
      </tbody>
    </Table>
  );
}

function Ros2BuildIcon({ distro, pkg, config, build_type }) {
  // Some short-tag values for reference
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


  if (distro === "foxy" && build_type === "armhf") {
    return Empty;
  }
  if (build_type === "dev" && config.no_dev_build) {
    return Empty;
  }

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
        Object.entries(packages).map(([name, config]) =>
          <tr key={name}>
            <td>{name}</td>
            <td><Ros2BuildIcon distro={distro} pkg={name} config={config} build_type="dev" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={name} config={config} build_type="src" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={name} config={config} build_type="x86_64" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={name} config={config} build_type="aarch64" /></td>
            <td><Ros2BuildIcon distro={distro} pkg={name} config={config} build_type="armhf" /></td>
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
