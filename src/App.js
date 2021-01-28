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
  "ros-tooling/system_metrics_collector": {},
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

const rolling_packages = {
  "ros2bag": {"no_dev_build": true},
  "rosbag2": {},
  "rosbag2_compression": {"no_dev_build": true},
  "rosbag2_converter_default_plugins": {"no_dev_build": true},
  "rosbag2_cpp": {"no_dev_build": true},
  "rosbag2_py": {"no_dev_build": true},
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
  if (build_type === "dev" && config.no_dev_build) {
    return Empty;
  }

  // Reference logic for tags. Complex enough and requiring hidden config files, so
  // not easy to fully replicate
  // https://github.com/ros-infrastructure/ros_buildfarm/blob/master/ros_buildfarm/common.py
  const sl = (short, long) => { return [ short, long ]; };
  const tags = {
    "dev": {
      "dashing": sl("Ddev", "ubuntu_bionic_amd64"),
      "foxy": sl("Fdev", "ubuntu_focal_amd64"),
      "rolling": sl("Rdev", "ubuntu_focal_amd64"),
    },
    "src": {
      "dashing": sl("Dsrc_uB", "ubuntu_bionic__source"),
      "foxy": sl("Fsrc_uF", "ubuntu_focal__source"),
      "rolling": sl("Rsrc_uF", "ubuntu_focal__source"),
    },
    "x86_64": {
      "dashing": sl("Dbin_uB64", "ubuntu_bionic_amd64__binary"),
      "foxy": sl("Fbin_uF64", "ubuntu_focal_amd64__binary"),
      "rolling": sl("Rbin_uF64", "ubuntu_focal_amd64__binary"),
    },
    "aarch64": {
      "dashing": sl("Dbin_ubv8_uBv8", "ubuntu_bionic_arm64__binary"),
      "foxy": sl("Fbin_ubv8_uFv8", "ubuntu_focal_arm64__binary"),
      "rolling": sl("Rbin_ufv8_uFv8", "ubuntu_focal_arm64__binary"),
    },
    "armhf": {
      "dashing": sl("Dbin_ubhf_uBhf", "ubuntu_bionic_armhf__binary"),
      "foxy": undefined,
      "rolling": undefined,
    }
  }

  const shortlong = tags[build_type][distro];
  let short_tag;
  let long_tag;
  if (shortlong === undefined) {
    return Empty;
  } else {
    [short_tag, long_tag] = shortlong;
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
          <h1>Released Packages - Rolling Ridley</h1>
          <DistroReleaseTable distro="rolling" packages={rolling_packages} />
        </Row>
        <Row>
          <h1> Released Packages - Foxy Fitzroy</h1>
          <DistroReleaseTable distro="foxy" packages={foxy_packages} />
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
