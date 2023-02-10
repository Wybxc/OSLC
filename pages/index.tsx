import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav';
import { useEffect, useState } from 'react';

import ColorModeSwitch from '@/components/ColorModeSwitch';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Header from '@/components/Header';
import { ImGithub } from 'react-icons/im';
import Link from 'next/link';
import { TbLicense } from 'react-icons/tb';
import useFetch from '@/scripts/useFetch';

const licenses = [
  '0BSD',
  'AAL',
  'AFL-3.0',
  'AGPL-3.0',
  'AGPL-3.0+',
  'Apache-2.0',
  'Artistic-2.0',
  'BSD-1-Clause',
  'BSD-2-Clause',
  'BSD-2-Clause-Patent',
  'BSD-3-Clause',
  'BSD-3-Clause-Clear',
  'BSD-4-Clause',
  'BSL-1.0',
  'CC0-1.0',
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'CDDL-1.0',
  'CECILL-2.1',
  'ClArtistic',
  'CPAL-1.0',
  'ECL-2.0',
  'EFL-2.0',
  'EPL-1.0',
  'EPL-2.0',
  'EUPL-1.1',
  'EUPL-1.2',
  'Fair',
  'FSFAP',
  'GPL-2.0',
  'GPL-2.0+',
  'GPL-3.0',
  'GPL-3.0+',
  'Imlib2',
  'ISC',
  'LGPL-2.1',
  'LGPL-2.1+',
  'LGPL-3.0',
  'LGPL-3.0+',
  'LiLiQ-P-1.1',
  'LiLiQ-R-1.1',
  'LiLiQ-Rplus-1.1',
  'MirOS',
  'MIT',
  'MIT-0',
  'MPL-2.0',
  'MS-PL',
  'MS-RL',
  'MulanPSL-2.0',
  'MulanPubL-2.0',
  'NCSA',
  'NOSL',
  'NPOSL-3.0',
  'NTP',
  'OGTSL',
  'OSL-3.0',
  'RPL-1.5',
  'Ruby',
  'SimPL-2.0',
  'Unlicense',
  'UPL-1.0',
  'WTFPL',
  'Zlib',
];

export default function Home() {
  const [licenseA, setLicenseA] = useState('');
  const [licenseB, setLicenseB] = useState('');

  return (
    <>
      <Head>
        <title>开源协议兼容性</title>
        <meta name="description" content="开源协议兼容性查询" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" minH="100vh">
        <SkipNavLink>Skip to content</SkipNavLink>
        <Header title="开源协议兼容性">
          <HStack spacing={{ base: 1, md: 2 }} fontSize="lg">
            <IconButton
              as={Link}
              href="https://github.com/Wybxc/OSLC"
              title="GitHub 仓库"
              aria-label="GitHub 仓库"
              icon={<ImGithub />}
              variant="ghost"
            />
            <ColorModeSwitch />
          </HStack>
        </Header>

        <SkipNavContent />
        <Box as="main">
          <Hero
            licenseA={licenseA}
            setLicenseA={setLicenseA}
            licenseB={licenseB}
            setLicenseB={setLicenseB}
          />

          <Container maxW="container.md" pt="4">
            {licenseA && licenseB ? (
              <Compatibility licenseA={licenseA} licenseB={licenseB} />
            ) : (
              <>
                {licenseA && <CompatibilityFrom licenseA={licenseA} />}
                {licenseB && <CompatibilityTo licenseB={licenseB} />}
              </>
            )}
          </Container>
        </Box>

        <Spacer />
        <Footer>
          <Text>数据来源于个人整理，仅供参考，不作为法律依据。</Text>
          <Text>
            OSLC ©2023 | Powered by{' '}
            <Link href="https://nextjs.org/" target="_blank">
              Next.js
            </Link>
            {' and '}
            <Link href="https://chakra-ui.com/" target="_blank">
              Chakra UI
            </Link>
          </Text>
        </Footer>
      </Flex>
    </>
  );
}

interface HeroProps {
  licenseA: string;
  setLicenseA: (value: string) => void;
  licenseB: string;
  setLicenseB: (value: string) => void;
}

function Hero({ licenseA, setLicenseA, licenseB, setLicenseB }: HeroProps) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        bgColor={colorMode === 'light' ? '#eaad54' : '#914223'}
        pt="20"
        pb="10"
        px={{ base: 4, sm: 8, md: 12, lg: 24 }}
        backgroundImage={
          colorMode === 'light'
            ? "url('hero-bg-light.svg')"
            : "url('hero-bg-dark.svg')"
        }
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 25%"
        backgroundSize="1400px"
        boxShadow="lg"
      >
        <Text
          fontSize="lg"
          mt="5"
          mb="10"
          w={{ base: '100%', md: '30rem', lg: '50rem' }}
          maxH="40"
        >
          开源协议（Open Source
          License）是对开放源代码的计算机软件进行的法律许可，目前世界上有多达上百种开源协议。开源协议既是授权，也是限制。在为项目选择开源协议时，不同协议之间的兼容性是一个重要的考量因素。
        </Text>
        <Flex
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
          fontWeight="bold"
          wrap="wrap"
        >
          <Text py="1">
            我想在
            <Select
              mx="2"
              w="40"
              h="14"
              size="lg"
              display="inline-block"
              verticalAlign="middle"
              value={licenseA}
              onChange={(e) => setLicenseA(e.target.value)}
            >
              <option value="">（开源协议）</option>
              {licenses.map((license) => (
                <option value={license} key={license}>
                  {license}
                </option>
              ))}
            </Select>
            的项目
          </Text>
          <Text py="1">
            中使用
            <Select
              mx="2"
              w="40"
              h="14"
              size="lg"
              display="inline-block"
              verticalAlign="middle"
              value={licenseB}
              onChange={(e) => setLicenseB(e.target.value)}
            >
              <option value="">（开源协议）</option>
              {licenses.map((license) => (
                <option value={license} key={license}>
                  {license}
                </option>
              ))}
            </Select>
            的代码！
          </Text>
        </Flex>
      </Box>
    </>
  );
}

interface CompatibilityProps {
  licenseA: string;
  licenseB: string;
}

function Compatibility({ licenseA, licenseB }: CompatibilityProps) {
  const compatibility = useFetch(
    `/api/compatibility?a=${encodeURIComponent(
      licenseA
    )}&b=${encodeURIComponent(licenseB)}`,
    (data) => parseInt(data)
  );

  if (compatibility === null) return <></>;

  if (compatibility === 0)
    return (
      <Card>
        <CardHeader>
          <Heading as="h2" size="lg">
            {licenseA} 不兼容 {licenseB}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {licenseA} 不兼容 {licenseB}，这意味着，你<b>不能</b>在以 {licenseA}{' '}
            协议授权的项目中使用以 {licenseB} 协议授权的代码。
          </Text>
        </CardBody>
      </Card>
    );
  if (compatibility === 1)
    return (
      <Card>
        <CardHeader>
          <Heading as="h2" size="lg">
            {licenseA} 次级兼容 {licenseB}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {licenseA} 次级兼容 {licenseB}，这意味着，你<b>可以</b>在以{' '}
            {licenseA} 协议授权的项目中使用以 {licenseB}{' '}
            协议授权的代码，并且，项目所使用的以 {licenseB} 协议授权的代码也将以{' '}
            {licenseA} 协议授权。
          </Text>
        </CardBody>
      </Card>
    );
  if (compatibility === 2)
    return (
      <Card>
        <CardHeader>
          <Heading as="h2" size="lg">
            {licenseA} 组合兼容 {licenseB}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {licenseA} 组合兼容 {licenseB}，这意味着，你<b>可以</b>在以{' '}
            {licenseA} 协议授权的项目中使用以 {licenseB}{' '}
            协议授权的代码，但项目所使用的以 {licenseB}{' '}
            协议授权的代码需要保留原本的 {licenseB} 协议。
          </Text>
        </CardBody>
      </Card>
    );
  if (compatibility === 3)
    return (
      <Card>
        <CardHeader>
          <Heading as="h2" size="lg">
            {licenseA} 全兼容 {licenseB}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {licenseA} 全兼容 {licenseB}，这意味着，你<b>可以</b>在以 {licenseA}{' '}
            协议授权的项目中使用以 {licenseB}{' '}
            协议授权的代码，并且，项目所使用的以 {licenseB}{' '}
            协议授权的代码可以保留原本的 {licenseB} 协议，也可以再次以{' '}
            {licenseA} 协议授权。
          </Text>
        </CardBody>
      </Card>
    );

  return <>未知错误</>;
}

interface LicensesCardProps {
  title: string;
  description: string;
  licenses: string[];
}

function LicensesCard({ title, description, licenses }: LicensesCardProps) {
  return (
    <Card>
      <CardHeader>
        <Heading as="h2" size="lg">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>
        {description}
        <SimpleGrid
          as={List}
          minChildWidth="40"
          spacing="4"
          pt="4"
          fontSize="lg"
        >
          {licenses.map((license) => (
            <ListItem key={license}>
              <ListIcon as={TbLicense} />
              {license}
            </ListItem>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}

interface CompatibilityFrom {
  licenseA: string;
}

function CompatibilityFrom({ licenseA }: CompatibilityFrom) {
  const compatibility = useFetch<{ [key: string]: string }>(
    `/api/compatibility?a=${encodeURIComponent(licenseA)}`
  );

  if (compatibility === null) return <></>;

  const notCompatible = licenses.filter(
    (license) => compatibility[license] === '0'
  );
  const compatible = licenses.filter(
    (license) => compatibility[license] === '1'
  );
  const compatibleWithCombination = licenses.filter(
    (license) => compatibility[license] === '2'
  );
  const fullyCompatible = licenses.filter(
    (license) => compatibility[license] === '3'
  );

  return (
    <VStack gap="4">
      {fullyCompatible.length > 0 && (
        <LicensesCard
          title={`${licenseA} 全兼容的协议`}
          description={`${licenseA} 全兼容以下协议，这意味着，你可以在以 ${licenseA} 协议授权的项目中使用以以下协议授权的代码，并且，项目所使用的以以下协议授权的代码可以保留原本的协议，也可以再次以 ${licenseA} 协议授权。`}
          licenses={fullyCompatible}
        />
      )}
      {compatible.length > 0 && (
        <LicensesCard
          title={`${licenseA} 次级兼容的协议`}
          description={`${licenseA} 次级兼容以下协议，这意味着，你可以在以 ${licenseA} 协议授权的项目中使用以以下协议授权的代码，并且，项目所使用的以以下协议授权的代码也将以 ${licenseA} 协议授权。`}
          licenses={compatible}
        />
      )}
      {compatibleWithCombination.length > 0 && (
        <LicensesCard
          title={`${licenseA} 组合兼容的协议`}
          description={`${licenseA} 组合兼容以下协议，这意味着，你可以在以 ${licenseA} 协议授权的项目中使用以以下协议授权的代码，但项目所使用的以以下协议授权的代码需要保留原本的协议。`}
          licenses={compatibleWithCombination}
        />
      )}
      {notCompatible.length > 0 && (
        <LicensesCard
          title={`${licenseA} 不兼容的协议`}
          description={`${licenseA} 不兼容以下协议，这意味着，你不能在以 ${licenseA} 协议授权的项目中使用以以下协议授权的代码。`}
          licenses={notCompatible}
        />
      )}
    </VStack>
  );
}

interface CompatibilityToProps {
  licenseB: string;
}

function CompatibilityTo({ licenseB }: CompatibilityToProps) {
  const compatibility = useFetch<{ [key: string]: string }>(
    `/api/compatibility?b=${encodeURIComponent(licenseB)}`
  );

  if (compatibility === null) return <></>;

  const notCompatible = licenses.filter(
    (license) => compatibility[license] === '0'
  );
  const compatible = licenses.filter(
    (license) => compatibility[license] === '1'
  );
  const compatibleWithCombination = licenses.filter(
    (license) => compatibility[license] === '2'
  );
  const fullyCompatible = licenses.filter(
    (license) => compatibility[license] === '3'
  );

  return (
    <VStack gap="4">
      {fullyCompatible.length > 0 && (
        <LicensesCard
          title={`全兼容 ${licenseB} 的协议`}
          description={`以下协议全兼容 ${licenseB}，这意味着，你可以在以以下协议授权的项目中使用以 ${licenseB} 协议授权的代码，并且，项目所使用的以 ${licenseB} 协议授权的代码可以保留原本的协议，也可以再次以新协议授权。`}
          licenses={fullyCompatible}
        />
      )}
      {compatible.length > 0 && (
        <LicensesCard
          title={`次级兼容 ${licenseB} 的协议`}
          description={`以下协议次级兼容 ${licenseB}，这意味着，你可以在以以下协议授权的项目中使用以 ${licenseB} 协议授权的代码，并且，项目所使用的以 ${licenseB} 协议授权的代码也将以新协议授权。`}
          licenses={compatible}
        />
      )}
      {compatibleWithCombination.length > 0 && (
        <LicensesCard
          title={`组合兼容 ${licenseB} 的协议`}
          description={`以下协议组合兼容 ${licenseB}，这意味着，你可以在以以下协议授权的项目中使用以 ${licenseB} 协议授权的代码，但项目所使用的以 ${licenseB} 协议授权的代码需要保留原本的协议。`}
          licenses={compatibleWithCombination}
        />
      )}
      {notCompatible.length > 0 && (
        <LicensesCard
          title={`不兼容 ${licenseB} 的协议`}
          description={`以下协议不兼容 ${licenseB}，这意味着，你不能在以以下协议授权的项目中使用以 ${licenseB} 协议授权的代码。`}
          licenses={notCompatible}
        />
      )}
    </VStack>
  );
}
