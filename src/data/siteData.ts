import { SiteData } from '../types/site';

/**
 * =======================================================================
 * 个人主页数据配置文件 (Personal Academic Homepage Data File)
 * =======================================================================
 * 
 * 提示：
 * 1. 所有内容均在此处集中维护，支持中英文双语 (zh / en)。
 * 2. 如果某个字段或区块留空 (如空数组 [] 或 undefined)，页面将自动隐藏该区块。
 * 3. 详细介绍支持 Markdown 格式：包括粗体 (**text**)、斜体 (*text*)、链接 ([文字](网址))、列表 (- 列表项)。
 * 4. News、Publications、Honors、Service 完全按照数组中的顺序展示：写在前面的显示在上面。
 * 5. 这四个板块无需 id 或排序字段。论文年份直接写在 venue 中；动态 date、荣誉 date、服务 period 均可选，只用于页面显示。
 */

export const siteData: SiteData = {
  /**
   * =======================================================================
   * 0. 各大板块显示开关 (Section Visibility Switches)
   * =======================================================================
   * 提示：直接将某项设为 false 即可隐藏对应板块（左侧目录导航也会自动隐藏），无需删除下方的数据；
   * 若设为 true，则在有数据时正常显示。
   */
  enabledSections: {
    about: true,          // 关于我 (About Me)
    interests: true,      // 研究兴趣与方向 (Research Interests)
    news: true,           // 最新动态 (Recent News)
    education: false,      // 教育背景 (Education)
    experience: false,     // 工作与学术经历 (Experience)
    projects: false,       // 精选项目 (Selected Projects)
    publications: true,   // 代表性论文与出版物 (Publications)
    honors: true,         // 荣誉与奖项 (Honors & Awards)
    services: true,       // 专业服务与兼职 (Professional Service)
    gallery: true,        // 相册足迹 (Gallery & Moments)
    music: false,          // 音乐天地与原声 (Music & Audio)
  },

  // 1. 个人基本信息
  profile: {
    name: {
      zh: '马汇东',
      en: 'Huidong Ma',
    },
    englishName: 'Huidong Ma',
    title: {
      zh: '博士研究生',
      en: 'Ph.D. Candidate',
    },
    affiliation: {
      zh: '南开大学',
      en: 'Nankai University',
    },
    location: {
      zh: '',
      en: '',
    },
    avatarUrl: '/images/profile.png',
    bioSummary: {
      zh: '研究方向：数据压缩、深度学习、高性能计算与大语言模型。',
      en: 'Research interests: data compression, deep learning, high-performance computing, and large language models.',
    },
    detailedBio: {
      zh: `我是马汇东，南开大学计算机科学与技术专业博士研究生，导师为 [Xiaoguang Liu 教授](https://cc.nankai.edu.cn/2021/0323/c13619a548878/page.htm) 和 [Gang Wang 教授](https://cc.nankai.edu.cn/2021/0323/c13619a548871/page.htm)。

2025 年 9 月至 2026 年 8 月，我在新加坡南洋理工大学计算与数据科学学院访问，与 [Wentong Cai 教授](https://personal.ntu.edu.sg/aswtcai/) 合作开展研究。

我的研究兴趣包括 **数据压缩**、**深度学习** 和 **高性能计算**，同时开展 **大语言模型** 相关研究。研究成果见于 CVPR、ACL、WWW、SIGKDD 和 FCS 等会议与期刊。

欢迎通过 [电子邮件](mailto:mahdcs@163.com) 联系我，交流相关研究。`,
      en: `I am Huidong Ma, a Ph.D. candidate in Computer Science and Technology at Nankai University, advised by Prof. [Xiaoguang Liu](https://cc.nankai.edu.cn/2021/0323/c13619a548878/page.htm) and Prof. [Gang Wang](https://cc.nankai.edu.cn/2021/0323/c13619a548871/page.htm).

From September 2025 to August 2026, I was a visiting student at the College of Computing and Data Science, Nanyang Technological University, working with Prof. [Wentong Cai](https://personal.ntu.edu.sg/aswtcai/).

My research interests include **Data Compression**, **Deep Learning**, and **High-Performance Computing**. I also work on research related to **Large Language Models**, with publications at venues including CVPR, ACL, WWW, SIGKDD, and FCS.

Please feel free to [reach out](mailto:mahdcs@163.com) if you are interested in my research.`,
    },
    cvUrl: '',
  },

  // 2. 社交与学术网络链接 (若某项不需要，可注释或设为 undefined)
  socials: {
    email: 'mailto:mahdcs@163.com',
    scholar: 'https://scholar.google.com/citations?user=uuqdjjsAAAAJ&hl=en',
    github: 'https://github.com/huidong-ma',
    orcid: 'https://orcid.org/0009-0008-0882-8212',
    researchgate: 'https://www.researchgate.net/profile/Huidong-Ma?ev=hdr_xprf',
    linkedin: '',
    twitter: '',
    blog: '',
  },

  // 3. 研究兴趣 / 个人方向 (可选)
  researchInterests: [
    {
      id: 'interest-data-compression',
      title: {
        zh: '数据压缩',
        en: 'Data Compression',
      },
      description: {
        zh: '关注多源数据与基因组数据的无损压缩，以及学习式图像压缩。',
        en: 'Research on lossless compression for multi-source and genomic data, and learned image compression.',
      },
      keywords: ['Lossless Compression', 'Learned Compression', 'Genomics'],
    },
    {
      id: 'interest-deep-learning',
      title: {
        zh: '深度学习',
        en: 'Deep Learning',
      },
      description: {
        zh: '探索深度学习在数据压缩中的应用。',
        en: 'Exploring applications of deep learning to data compression.',
      },
      keywords: ['Deep Learning', 'Learned Compression'],
    },
    {
      id: 'interest-hpc',
      title: {
        zh: '高性能计算',
        en: 'High-Performance Computing',
      },
      keywords: ['High-Performance Computing'],
    },
    {
      id: 'interest-llm',
      title: {
        zh: '大语言模型',
        en: 'Large Language Models',
      },
      description: {
        zh: '开展与大语言模型相关的研究。',
        en: 'Research related to large language models.',
      },
      keywords: ['Large Language Models'],
    },
  ],

  // 4. 最新动态 (按数组顺序展示，支持可选日期和链接)
  news: [
    {
      date: '2026.11',
      content: {
        zh: '🎉 一篇论文被 BDMA 录用。',
        en: '🎉 One paper has been accepted by BDMA.',
      },
      tag: {
        zh: '论文录用',
        en: 'Publication',
      },
    },
    {
      date: '2026.04',
      content: {
        zh: '🎉 两篇论文被 ACL 2026 录用，其中 1 篇为 Oral，1 篇为 Findings。',
        en: '🎉 Two papers are accepted by ACL 2026 (1 Oral and 1 Findings).',
      },
      tag: {
        zh: '论文录用',
        en: 'Publication',
      },
    },
    {
      date: '2026.02',
      content: {
        zh: '🎉 两篇论文分别被 CVPR 2026 和 DAC 2026 录用。',
        en: '🎉 Two papers are accepted by CVPR 2026 and DAC 2026 respectively.',
      },
      tag: {
        zh: '论文录用',
        en: 'Publication',
      },
    },
    {
      date: '2025.05',
      content: {
        zh: '🎉 一篇论文被 SIGKDD 2025 录用。',
        en: '🎉 One paper is accepted by SIGKDD 2025.',
      },
      tag: {
        zh: '论文录用',
        en: 'Publication',
      },
    },
    {
      date: '2025.01',
      content: {
        zh: '🎉 一篇论文被 WWW 2025 录用。',
        en: '🎉 One paper is accepted by WWW 2025.',
      },
      tag: {
        zh: '论文录用',
        en: 'Publication',
      },
    },
    {
      date: '2024.12',
      content: {
        zh: '🎉 两篇论文被 ICASSP 2025 录用。',
        en: '🎉 Two papers are accepted by ICASSP 2025.',
      },
      tag: {
        zh: '论文录用',
        en: 'Publication',
      },
    },
  ],

  // 5. 教育经历 (学校、地点、学位、专业、时间、导师、学校 Logo)
  education: [
    {
      id: 'edu-nankai-phd',
      institution: {
        zh: '南开大学',
        en: 'Nankai University',
      },
      degree: {
        zh: '博士研究生（在读）',
        en: 'Ph.D. Candidate',
      },
      major: {
        zh: '计算机科学与技术',
        en: 'Computer Science and Technology',
      },
      period: '',
      advisor: {
        zh: '导师：Xiaoguang Liu 教授、Gang Wang 教授',
        en: 'Advisors: Prof. Xiaoguang Liu and Prof. Gang Wang',
      },
    },
  ],

  // 6. 工作与科研实习经历
  experience: [
    {
      id: 'exp-ntu-visit',
      organization: {
        zh: '南洋理工大学',
        en: 'Nanyang Technological University',
      },
      role: {
        zh: '访问学生',
        en: 'Visiting Student',
      },
      period: '2025.09 - 2026.08',
      location: {
        zh: '新加坡',
        en: 'Singapore',
      },
      description: {
        zh: '在计算与数据科学学院开展访问研究，合作导师为 Wentong Cai 教授。',
        en: 'Visiting research at the College of Computing and Data Science, working with Prof. Wentong Cai.',
      },
    },
  ],

  // 7. 代表性项目
  projects: [],

  // 8. 代表性论文与学术出版物 (Publications)
  // 【设计规范与填写指南】：
  // - 论文名称 (title)、作者 (authors)、会议/期刊 (venue) 保持纯英文，不因中英文切换而改变。
  // - venue 采用标准学术简写加粗展示（如：'NeurIPS 2025 (Oral)', 'IEEE TC 2024', 'ICLR 2024 (Spotlight)'）。
  // - venueFullName: 会议/期刊全称（鼠标悬停在 venue 简写上时会弹出悬浮卡片显示此全称；系统内置了数十种顶级会议与期刊的自动识别字典，不填也会自动精准推导）。
  // - 学术评价指标展示顺序（严格统一）：【CCF】->【CAS 中科院分区】->【JCR 分区】->【IF 影响因子】
  //   * 1. ccf: CCF等级（如 'CCF-A'），无需翻译
  //   * 2. casTier: 中科院分区（唯一需要中英文对照翻译），如 { zh: '中科院1区 (Top)', en: 'CAS Tier 1 (Top)' }
  //   * 3. jcr: JCR分区（如 'JCR Q1' 或直接填 'Q1'），无需翻译
  //   * 4. impactFactor: 影响因子（如 'IF 23.6' 或直接填数字 '23.6'），无需翻译，统一以 IF 前缀呈现
  //   * tags: 其他自定指标或标签数组
  // - 底部右侧操作按钮【摘要 / Abstract】、【论文 / Paper】、【代码 / Code】、【引用 / BibTeX】支持中英文自动切换。
  publications: [
    {
      title: 'Neural Lossless Genomic Compression with Sensitive-Region Protection',
      authors: ['Huidong Ma', 'Hui Sun', 'Haonan Xie', 'Meng Yan', 'Chang Xu', 'Cheng Zhong', 'Gang Wang', 'Xiaoguang Liu', 'Wentong Cai'],
      venue: 'BDMA 2027',
      venueFullName: 'Big Data Mining and Analytics',
      ccf: 'CCF-T1',
      casTier: { zh: '中科院1区', en: 'CAS Tier 1' },
      jcr: 'Q1',
      impactFactor: '6.1',
      tags: [],
      abstract: 'Large-scale genomic data are essential for data mining and analytics, but their growing volume and inherent sensitivity pose significant challenges to efficient storage and secure sharing. Existing lossless compressors model sequence redundancy effectively, yet they typically require access to the plaintext genome. Encrypting the entire sequence before compression protects the data but removes much of the redundancy needed for efficient coding. We present SeGen, a learning-based framework for lossless genomic compression with sensitive-region protection. Its parallel sensitive sequence masking module uses a sensitive-sequence dictionary to identify sensitive regions and cryptographically mask them. It encrypts their location metadata and authenticates the protected components while preserving the sequence length and the four-symbol DNA alphabet. The authorized recipient can recover the protected bases and reconstruct the original sequence. SeGen uses a DNA grouper and a genomic compression neural network to compress the masked sequences. On 16 real-world datasets and against 19 baselines, SeGen achieves an average compression ratio of 1.771 bits/base, improving on the evaluated baselines by 4.218%–55.233%. Compared with learning-based baselines, it provides speedups of 1.134×–4.904× and reduces average peak memory usage by 1.767%–57.099%. On the HoSa dataset, selective protection avoids 77.1% of the compression degradation introduced by protecting the full sequence.',
      paperUrl: '',
      codeUrl: 'https://github.com/huidong-ma/SeGen',
      highlight: true,
      bibtex: ``,
    },
    {
      title: 'Efficient Learned Data Compression via Dual-Stream Feature Decoupling',
      authors: ['Huidong Ma', 'Xinyan Shi', 'Hui Sun', 'Xiaofei Yue', 'Xiaoguang Liu', 'Gang Wang', 'Wentong Cai'],
      venue: 'ACL 2026 (Oral)',
      venueFullName: 'Annual Meeting of the Association for Computational Linguistics',
      ccf: 'CCF-A',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'While Learned Data Compression (LDC) has achieved superior compression ratios, balancing precise probability modeling with system efficiency remains challenging. Crucially, uniform single-stream architectures struggle to simultaneously capture micro-syntactic and macro-semantic features, necessitating deep serial stacking that exacerbates latency. Compounding this, heterogeneous systems are constrained by device speed mismatches, where throughput is capped by Amdahl’s Law due to serial processing. To this end, we propose a Dual-Stream Multi-Scale Decoupler that disentangles local and global contexts to replace deep serial processing with shallow parallel streams, and incorporate a Hierarchical Gated Refiner for adaptive feature refinement and precise probability modeling. Furthermore, we design a Concurrent Stream-Parallel Pipeline, which overcomes systemic bottlenecks to achieve full-pipeline parallelism. Extensive experiments demonstrate that our method achieves state-of-the-art performance in both compression ratio and throughput, while maintaining the lowest latency and memory usage.',
      paperUrl: '/papers/2026_ACL_Efficient_Learned_Data_Compression_via_Dual-Stream_Feature_Decoupling.pdf',
      codeUrl: 'https://github.com/huidong-ma/FADE',
      highlight: true,
      bibtex: `@inproceedings{ma2026efficient,
  title={Efficient Learned Data Compression via Dual-Stream Feature Decoupling},
  author={Ma, Huidong and Shi, Xinyan and Hui, Sun and Yue, Xiaofei and Liu, Xiaoguang and Wang, Gang and Cai, Wentong},
  booktitle={Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)},
  pages={7151--7164},
  year={2026}
}`,
    },
    {
      title: 'AgentGC: Evolutionary Learning-based Lossless Compression for Genomics Data with LLM-driven Multiple Agent',
      authors: ['Hui Sun', 'Yanfeng Ding', 'Huidong Ma', 'Chang Xu', 'Keyan Jin', 'Lizheng Zu', 'Cheng Zhong', 'Xiaoguang Liu', 'Gang Wang', 'Wentong Cai'],
      venue: 'ACL 2026 Findings',
      venueFullName: 'Findings of the Association for Computational Linguistics',
      ccf: '',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Lossless compression has made significant advancements in Genomics Data (GD) storage, sharing and management. Current learning-based methods are non-evolvable and suffer from low-level compression modeling, limited adaptability, and an unfriendly user interface. To this end, we propose AgentGC, the first evolutionary Agent-based GD Compressor, consisting of three layers with multi-agents named Leader and Worker. Specifically, 1) the User layer provides a user-friendly interface via the Leader combined with an LLM; 2) the Cognitive layer, driven by the Leader, integrates an LLM to support the joint optimization of algorithm–dataset–system, addressing the issues of low-level modeling and limited adaptability; and 3) the Compression layer, headed by Workers, performs compression & decompression through an automated multi-knowledge learning-based compression framework. Built upon AgentGC, we design three modes to support diverse scenarios: CP for compression-ratio priority, TP for throughput priority, and BM for balanced mode. Compared with 14 baselines across 9 datasets, the average compression ratio gains are 16.66%, 16.11%, and 16.33%, and the throughput gains are 4.73×, 9.23×, and 9.15×, respectively.',
      paperUrl: '/papers/2026_ACL_AgentGCEvolutionary_Learning-based_Lossless_Compression_for_Genomics_Data_with_LLM-driven_Multiple_Agent.pdf',
      bibtex: `@inproceedings{hui2026agentgc,
  title={AgentGC: Evolutionary Learning-based Lossless Compression for Genomics Data with LLM-driven Multiple Agent},
  author={Hui, Sun and Yanfeng, Ding and Ma, Huidong and Xu, Chang and Jin, Keyan and Zu, Lizheng and Zhong, Cheng and Liu, Xiaoguang and Wang, Gang and Cai, Wentong},
  booktitle={Findings of the Association for Computational Linguistics: ACL 2026},
  pages={2740--2757},
  year={2026}
}`,
    },
    {
      title: 'sMoE: Elastic MoE-Based Inference with Serverless Computing via Fine-grained Expert Scaling',
      authors: ['Xiaofei Yue', 'Ziming Zhao', 'Jiongchi Yu', 'Huidong Ma', 'Zhaoxuan Li', 'Tingting Li', 'Jianwei Yin'],
      venue: 'DAC 2026',
      venueFullName: 'Design Automation Conference',
      ccf: 'CCF-A',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Mixture-of-Experts (MoE) architecture enables large-scale inference via sparse activation, but skewed, time-varying expert popularity leads to cost-inefficiency. Serverless computing is an attractive substrate due to its fine-grained resource elasticity and billing. Even so, achieving cost-efficient and SLO-compliant scaling for each expert with intra- and inter-layer dependencies under concurrent requests remains fraught with challenges. In this paper, we present sMoE, a topology-aware elastic auto-scaler for serverless MoE inference. Our insight is to treat the deployment of a MoE inference pipeline as a DAG of experts and non-MoE segments. Building on this, sMoE is designed as a deep reinforcement learning-based solution. Specifically, it encodes expert- and layer-level runtime features with DAGNN by propagating cross-layer semantics. Coupled with a layer-wise pointer network, sMoE captures intra-layer semantics to jointly decide vertical, horizontal configurations, and concurrency setting for each expert at runtime. Experimental results show that sMoE reduces serving cost by 21.4%–39.2% compared to state-of-the-art solutions, while meeting stringent P95 latency SLOs.',
      paperUrl: '/papers/2026_DAC_sMoEElastic_MoE-Based_Inference_with_Serverless_Computing_via_Fine-grained_Expert_Scaling.pdf',
      bibtex: `@inproceedings{yue2026smoe,
  title={sMoE: Elastic MoE-Based Inference with Serverless Computing via Fine-Grained Expert Scaling},
  author={Yue, Xiaofei and Zhao, Ziming and Yu, Jiongchi and Ma, Huidong and Li, Zhaoxuan and Li, Tingting and Yin, Jianwei},
  booktitle={Proceedings of the 63rd ACM/IEEE Design Automation Conference},
  pages={1--7},
  year={2026}
}`,
    },
    {
      title: 'Learned Image Compression via Sparse Attention and Adaptive Frequency',
      authors: ['Huidong Ma', 'Xinyan Shi', 'Hui Sun', 'Xiaofei Yue', 'Xiaoguang Liu', 'Gang Wang', 'Wentong Cai'],
      venue: 'CVPR 2026',
      venueFullName: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition',
      ccf: 'CCF-A',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Learned image compression (LIC) methods surpass traditional algorithms in rate-distortion (RD) performance, but still struggle to optimally balance effectiveness and efficiency. Moreover, although recent studies have demonstrated the effectiveness of utilizing frequency-domain information, they typically rely on fixed frequency transforms and still lack content-adaptive capabilities. Therefore, we propose an advanced spatial-frequency dual-path LIC method with enhanced adaptivity and efficiency. Specifically, for the spatial path, we introduce Cross-Sparse Window Attention, leveraging sparse, window-conditioned global tokens to efficiently model long-range dependencies. It achieves lower computational cost and superior effectiveness than standard Window-based Multi-head Self-attention. For the frequency path, we design a content-adaptive frequency transform, employing a decomposition weight generator and learnable global weights to adaptively process multi-scale frequency components. Furthermore, we propose Denoising-as-Regularizer, a training-only module that structures and smooths the latent representation via a denoising task, enhancing reconstruction quality at zero inference cost. Experiments on the Kodak, CLIC, and Tecnick datasets demonstrate that the proposed method significantly outperforms existing state-of-the-art methods in both RD performance and latency.',
      paperUrl: '/papers/2026_CVPR_Learned_Image_Compression_via_Sparse_Attention_and_Adaptive_Frequency.pdf',
      codeUrl: 'https://github.com/huidong-ma/SAAF',
      highlight: true,
      bibtex: `@inproceedings{ma2026learned,
  title={Learned Image Compression via Sparse Attention and Adaptive Frequency},
  author={Ma, Huidong and Shi, Xinyan and Sun, Hui and Yue, Xiaofei and Liu, Xiaoguang and Wang, Gang and Cai, Wentong},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={41278--41287},
  year={2026}
}`,
    },
    {
      title: 'PMKLC: Parallel Multi-Knowledge Learning-based Lossless Compression for Large-Scale Genomics Database',
      authors: ['Hui Sun', 'Yanfeng Ding', 'Liping Yi', 'Huidong Ma', 'Gang Wang', 'Xiaoguang Liu', 'Cheng Zhong', 'Wentong Cai'],
      venue: 'SIGKDD 2025',
      venueFullName: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining',
      ccf: 'CCF-A',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Learning-based lossless compressors play a crucial role in large-scale genomic database backup, storage, transmission, and management. However, their 1) inadequate compression ratio, 2) low compression & decompression throughput, and 3) poor compression robustness limit their widespread adoption and application in both industry and academia. To solve these challenges, we propose a novel Parallel Multi-Knowledge Learning-based Compressor (PMKLC) with four crucial designs: 1) We propose an automated multi-knowledge learning-based compression framework as the compressor’s backbone to enhance compression ratio and robustness; 2) we design a GPU-accelerated \((s,k)\)-mer encoder to optimize compression throughput and computing resource usage; 3) we introduce data block partitioning and Step-wise Model Passing (SMP) mechanisms for parallel acceleration; 4) we design two compression modes PMKLC-S and PMKLC-M to meet complex application scenarios, where the former runs on a resource-constrained single GPU and the latter supports multi-GPU acceleration. We benchmark PMKLC-S/M and 14 baselines (7 traditional and 7 learning-based) on 15 real-world datasets covering different species and data sizes. Compared with the baselines on the test datasets, PMKLC-S/M achieve average compression ratio improvements of up to 73.609% and 73.480%, and average throughput improvements of up to 3.036× and 10.710×, respectively. Besides, PMKLC-S/M also achieve the best robustness and competitive memory cost, demonstrating stronger stability against datasets with different probability distribution perturbations and strong capability to run on memory-constrained devices. Overall, PMKLC is a balanced compression solution that jointly optimizes compression ratio, throughput, robustness, and resource consumption.',
      paperUrl: '/papers/2025_KDD_PMKLCParallel_Multi-Knowledge_Learning-based_Lossless_Compression_for_Large-Scale_Genomics_Database.pdf',
      codeUrl: 'https://github.com/dingyanfeng/PMKLC',
      bibtex: `@inproceedings{sun2025pmklc,
  title={Pmklc: Parallel multi-knowledge learning-based lossless compression for large-scale genomics database},
  author={Sun, Hui and Ding, Yanfeng and Yi, Liping and Ma, Huidong and Wang, Gang and Liu, Xiaoguang and Zhong, Cheng and Cai, Wentong},
  booktitle={Proceedings of the 31st ACM SIGKDD Conference on Knowledge Discovery and Data Mining V. 2},
  pages={2725--2734},
  year={2025}
}`,
    },
    {
      title: 'MSDZip: Universal Lossless Compression for Multi-source Data via Stepwise-parallel and Learning-based Prediction',
      authors: ['Huidong Ma†', 'Hui Sun†', 'Liping Yi', 'Yanfeng Ding', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'WWW 2025',
      venueFullName: 'The Web Conference',
      ccf: 'CCF-A',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'With the rapid development of the Internet, the huge amount of Multi-Source Data (MSD) brings challenges in data sharing and storage. Lossless data compression is the major way to solve these problems. Nowadays, neural-network technologies bring significant advantages in data modeling, and learning-based lossless compressors (LLCs) for multi-source data have emerged continuously. Compared with traditional compressors, LLCs are better at capturing complex redundancy patterns in MSD and thus hold great potential for improving the compression ratio. However, existing LLCs still suffer from unsatisfactory compression ratios and low throughput. To solve these problems, we propose a novel universal MSD lossless compressor called MSDZip with stepwise-parallel and learning-based prediction technologies. It incorporates two major designs: 1) We propose a Local-Global-Deep Mixing block in the learning-based prediction module to build dependencies among MSD symbols; the designed Deep Mixing block mitigates unstable weights in perceptual layers caused by the cold-start problem and substantially improves the compression ratio. 2) We design a stepwise-parallel multi-GPU-accelerated compression strategy to tackle the compression speed and GPU memory limitations of a single GPU when processing large-scale data. The stepwise-parallel module feeds source MSD into the learning-based prediction model via a data chunking strategy, where the model from the previous chunk guides the parallel compression of the next chunk. We compare MSDZip with 5 classical learning-based compressors and 6 traditional compressors on 12 well-studied real-world datasets. The experimental results demonstrate that MSDZip achieves 3.418%–69.874% improvement in compression ratio and 31.171%–495.649% improvement in throughput over state-of-the-art LLCs.',
      paperUrl: '/papers/2025_WWW_MSDZipUniversal_Lossless_Compression_for_Multi-source_Data_via_Stepwise-parallel_and_Learning-based_Prediction.pdf',
      codeUrl: 'https://github.com/huidong-ma/MSDZip',
      highlight: true,
      bibtex: `@inproceedings{ma2025msdzip,
  title={Msdzip: Universal lossless compression for multi-source data via stepwise-parallel and learning-based prediction},
  author={Ma, Huidong and Sun, Hui and Yi, Liping and Ding, Yanfeng and Liu, Xiaoguang and Wang, Gang},
  booktitle={Proceedings of the ACM on Web Conference 2025},
  pages={3543--3551},
  year={2025}
}`,
    },
    {
      title: 'Multi-source Data Lossless Compression via Parallel Expansion Mapping and xLSTM',
      authors: ['Huidong Ma', 'Hui Sun', 'Liping Yi', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'ICASSP 2025',
      venueFullName: 'IEEE International Conference on Acoustics, Speech and Signal Processing',
      ccf: 'CCF-B',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Explosive growth of multi-source data (MSD) poses challenges in data transmission and storage. Neural Network (NN)-based lossless compressors are an important type of compression approach to alleviate these problems. However, existing NN-based lossless compressors suffer from poor compression ratio and high time cost simultaneously. To address these issues, we propose a novel MSD Lossless Compressor (MSDLC) with two compression stages: 1) We propose a Parallel Expansion Mapper (PEM) to map redundant pieces in MSD into unused alphabet values, which not only compresses MSD but also saves time for the next stage’s NN-based lossless compression. 2) With the mapped MSD as input, we design a NN-based lossless compressor to further improve compression ratio, where we introduce the state-of-the-art xLSTM model and design a Deep Spatial Gating Module (DSGM) as the NN backbone. We compare MSDLC with 11 baselines on 6 real-world datasets and the results validate that MSDLC achieves the best average compression ratio and time efficiency. Compared with the baselines, compression ratios are improved by 1.103%–113.897%, and time costs are reduced by 41.367%–73.891%.',
      paperUrl: '/papers/2025_ICASSP_Multi-source_Data_Lossless_Compression_via_Parallel_Expansion_Mapping_and_xLSTM.pdf',
      codeUrl: 'https://github.com/huidong-ma/MSDLC',
      highlight: true,
      bibtex: `@inproceedings{ma2025multi,
  title={Multi-source data lossless compression via parallel expansion mapping and xlstm},
  author={Ma, Huidong and Sun, Hui and Yi, Liping and Liu, Xiaoguang and Wang, Gang},
  booktitle={ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
  pages={1--5},
  year={2025},
  organization={IEEE}
}`,
    },
    {
      title: 'Adaptive Lossless Compression for Genomics Data by Multiple (s, k)-mer Encoding and XLSTM',
      authors: ['Hui Sun†', 'Yanfeng Ding†', 'Liping Yi', 'Huidong Ma', 'Haonan Xie', 'Gang Wang', 'Xiaoguang Liu'],
      venue: 'ICASSP 2025',
      venueFullName: 'IEEE International Conference on Acoustics, Speech and Signal Processing',
      ccf: 'CCF-B',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Learning-based lossless compressors have been validated to have competitive advantages in genomics data (GD) compression. However, learning-based GD-dedicated compressors typically need to be pre-trained on multi-source data and then are directly used to compress another target data; we denote them as static compressors, and they often face two challenges: limited compression ratios and poor generalization caused by data distribution variations. To solve these problems, we propose AGDLC, a novel Adaptive Genomics Data Lossless Compressor. It includes two critical designs: 1) We design a multiple (s, k)-mer mixer for extracting GD redundancy from multiple dimensions to improve compression ratios. 2) We introduce the recently popular XLSTM model as the backbone, which adaptively compresses GD while updating parameters without pre-training, improving compression ratios and compression generalization at the same time. We compare AGDLC with 13 baselines on 7 real-world datasets, and the experimental results demonstrate that it achieves the best compression ratio with an average improvement of 2.162%–69.436%.',
      paperUrl: '/papers/2025_ICASSP_Adaptive_Lossless_Compression_for_Genomics_Data_by_Multiple_(s,_k)-mer_Encoding_and_XLSTM.pdf',
      codeUrl: 'https://github.com/dingyanfeng/AGDLC',
      bibtex: `@inproceedings{sun2025adaptive,
  title={Adaptive lossless compression for genomics data by multiple (s, k)-mer Encoding and XLSTM},
  author={Sun, Hui and Ding, Yanfeng and Yi, Liping and Ma, Huidong and Xie, Haonan and Wang, Gang and Liu, Xiaoguang},
  booktitle={ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
  pages={1--5},
  year={2025},
  organization={IEEE}
}`,
    },
    {
      title: 'A Survey and Benchmark Evaluation for Neural-Network-Based Lossless Universal Compressors Toward Multi-Source Data',
      authors: ['Hui Sun†', 'Huidong Ma†', 'Feng Ling', 'Haonan Xie', 'Yongxia Sun', 'Liping Yi', 'Meng Yan', 'Cheng Zhong', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'FCS 2025',
      venueFullName: 'Frontiers of Computer Science',
      ccf: 'CCF-B',
      casTier: { zh: '中科院2区', en: 'CAS Tier 2' },
      jcr: 'JCR Q1',
      impactFactor: 'IF 7.3',
      tags: [],
      abstract: 'As various types of data grow explosively, large-scale data storage, backup, and transmission become challenging, which motivates many researchers to propose efficient universal compression algorithms for multi-source data. In recent years, due to the emergence of hardware acceleration devices such as GPUs, TPUs, DPUs, and FPGAs, the performance bottleneck of neural networks (NN) has been overcome, making NN-based compression algorithms increasingly practical and popular. However, the research survey for the NN-based universal lossless compressors has not been conducted yet, and there is also a lack of unified evaluation metrics. To address the above problems, in this paper, we present a holistic survey as well as benchmark evaluations. Specifically, i) we thoroughly investigate NN-based lossless universal compression algorithms toward multi-source data and classify them into 3 types: static pre-training, adaptive, and semi-adaptive. ii) We unify 19 evaluation metrics to comprehensively assess the compression effect, resource consumption, and model performance of compressors. iii) We conduct experiments consuming more than 4600 CPU/GPU hours to evaluate 17 state-of-the-art compressors on 28 real-world datasets across data types of text, images, videos, audio, etc. iv) We also summarize the strengths and drawbacks of NN-based lossless data compressors and discuss promising research directions. We summarize the results as the NN-based Lossless Compressors Benchmark (NNLCB, See fahaihi.github.io/NNLCB website), which will be updated and maintained continuously in the future.',
      paperUrl: '/papers/2025_FCS_A_survey_and_benchmark_evaluation_for_neural-network-based_lossless_universal_compressors_toward_multi-source_data.pdf',
      codeUrl: 'https://github.com/fahaihi/NNLCB',
      highlight: true,
      bibtex: `@article{sun2025survey,
  title={A survey and benchmark evaluation for neural-network-based lossless universal compressors toward multi-source data},
  author={Sun, Hui and Ma, Huidong and Ling, Feng and Xie, Haonan and Sun, Yongxia and Yi, Liping and Yan, Meng and Zhong, Cheng and Liu, Xiaoguang and Wang, Gang},
  journal={Frontiers of Computer Science},
  volume={19},
  number={7},
  pages={197360},
  year={2025},
  publisher={Springer}
}`,
    },
    {
      title: 'Genomics Data Lossless Compression with (s,k)-mer Encoding and Deep Neural Networks',
      authors: ['Hui Sun†', 'Liping Yi†', 'Huidong Ma', 'Yongxia Sun', 'Yingfeng Zheng', 'Wenwen Cui', 'Meng Yan', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'AAAI 2025',
      venueFullName: 'AAAI Conference on Artificial Intelligence',
      ccf: 'CCF-A',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'Learning-based compression shows competitive compression ratios for genomics data. It often includes three types of compressors: static, adaptive and semi-adaptive. However, these existing compressors suffer from inferior compression ratios or throughput, and adaptive compressors also face model cold-start problems. To address these issues, we propose DeepGeCo, a novel genomics data lossless adaptive compression framework with (s, k)-mer encoding and deep neural networks, involving three compression modes (MINI for static, PLUS for adaptive, ULTRA for semi-adaptive) for flexible requirements of compression ratios or throughput. In DeepGeCo, (1) we develop BiGRU and Transformer as the backbone to build Warm-Start and Supporter models for mitigating cold-start problems. (2) We introduce (s, k)-mer encoding to pre-process genomics data before feeding it into the DNN model to improve model throughput, and we propose a new metric — Ranking of Throughput and Compression Ratio (RTCR) for effective encoding parameter selection. (3) We design a threshold controller and a probabilistic mixer within the backbone to balance compression ratios and model throughput. Experiments on 10 real-world datasets show that DeepGeCo’s three compression modes achieve up to 22.949× average throughput and up to 31.095% average compression ratio improvement while occupying low CPU or GPU memory.',
      paperUrl: '/papers/2025_AAAI_Genomics_Data_Lossless_Compression_with_(S,K)-Mer_Encoding_and_Deep_Neural_Networks.pdf',
      codeUrl: 'https://github.com/fahaihi/DeepGeCo',
      bibtex: `@inproceedings{sun2025genomics,
  title={Genomics data lossless compression with (s, k)-mer encoding and deep neural networks},
  author={Sun, Hui and Yi, Liping and Ma, Huidong and Sun, Yongxia and Zheng, Yingfeng and Cui, Wenwen and Yan, Meng and Wang, Gang and Liu, Xiaoguang},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={39},
  number={12},
  pages={12577--12585},
  year={2025}
}`,
    },
    {
      title: 'Aligning Protein-protein Interaction Networks Using Multi-feature Extraction and Network Embedding',
      authors: ['Haofa He', 'Huidong Ma', 'Cheng Zhong'],
      venue: 'JCCS 2025',
      venueFullName: 'Journal of Chinese Computer Systems',
      ccf: 'CCF-T2',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'In order to quickly obtain alignment results with high-score topological and biological attributes, an efficient method for aligning global protein-protein interaction networks using generative adversarial networks is proposed. By extracting the sequence alignment score, edge degree, clustering coefficient, and PageRank value of nodes in the network, the feature vectors of the nodes are embedded. The embeddings of the source network are mapped to the embedding space of the target network by the generative adversarial network to obtain preliminary alignment results. The final alignment result is obtained based on the Euclidean distance between vectors after statistical mapping. The experimental results on real protein-protein interaction network datasets show that compared with existing methods, our proposed method achieves overall advantages in terms of the topological indices: edge correctness, induced conserved structure, symmetric subgraph score, and gene homology consistency.',
      paperUrl: '/papers/2025_JCCS_Aligning_Protein-protein_Interaction_Networks_Using_Multi-feature_Extraction_and_Network_Embedding.pdf',
      bibtex: `@article{he46aligning,
  title={Aligning Protein-protein Interaction Networks Using Multi-feature Extraction and Network Embedding},
  author={He, Haofa and Ma, Huidong and Zhong, Cheng},
  journal={Journal of Chinese Mini-Micro Computer Systems},
  volume={46},
  number={4},
  pages={847--855},
  publisher={Science Press}
}`,
    },
    {
      title: 'PQSDC: a parallel lossless compressor for quality scores data via sequences partition and Run-Length prediction mapping',
      authors: ['Hui Sun', 'Yingfeng Zheng', 'Haonan Xie', 'Huidong Ma', 'Cheng Zhong', 'Meng Yan', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'Bioinformatics 2024',
      venueFullName: 'Bioinformatics',
      ccf: 'CCF-A',
      casTier: { zh: '中科院1区', en: 'CAS Tier 1' },
      jcr: 'JCR Q1',
      impactFactor: 'IF 5.5',
      tags: [],
      abstract: 'The quality scores data (QSD) account for 70% in compressed FastQ files obtained from the short and long reads sequencing technologies. Designing effective compressors for QSD that counterbalance compression ratio, time cost, and memory consumption is essential in scenarios such as large-scale genomics data sharing and long-term data backup. This study presents a novel parallel lossless QSD-dedicated compression algorithm named PQSDC, which fulfills the above requirements well. PQSDC is based on two core components: a parallel sequences-partition model designed to reduce peak memory consumption and time cost during compression and decompression processes, as well as a parallel four-level run-length prediction mapping model to enhance compression ratio. Besides, the PQSDC algorithm is also designed to be highly concurrent using multicore CPU clusters. We evaluate PQSDC and four state-of-the-art compression algorithms on 27 real-world datasets, including 61.857 billion QSD characters and 632.908 million QSD sequences. (1) For short reads, compared to baselines, the maximum improvement of PQSDC reaches 7.06% in average compression ratio, and 8.01% in weighted average compression ratio. During compression and decompression, the maximum total time savings of PQSDC are 79.96% and 84.56%, respectively; the maximum average memory savings are 68.34% and 77.63%, respectively. (2) For long reads, the maximum improvement of PQSDC reaches 12.51% and 13.42% in average and weighted average compression ratio, respectively. The maximum total time savings during compression and decompression are 53.51% and 72.53%, respectively; the maximum average memory savings are 19.44% and 17.42%, respectively. (3) Furthermore, PQSDC ranks second in compression robustness among the tested algorithms, indicating that it is less affected by the probability distribution of the QSD collections. Overall, our work provides a promising solution for QSD parallel compression, which balances storage cost, time consumption, and memory occupation primely.',
      paperUrl: '/papers/2024_Bioinformatics_PQSDCa_parallel_lossless_compressor_for_quality_scores_data_via_sequences_partition_and_run-length_prediction_mapping.pdf',
      codeUrl: 'https://github.com/fahaihi/PQSDC',
      bibtex: `@article{sun2024pqsdc,
  title={PQSDC: a parallel lossless compressor for quality scores data via sequences partition and run-length prediction mapping},
  author={Sun, Hui and Zheng, Yingfeng and Xie, Haonan and Ma, Huidong and Zhong, Cheng and Yan, Meng and Liu, Xiaoguang and Wang, Gang},
  journal={Bioinformatics},
  volume={40},
  number={5},
  pages={btae323},
  year={2024},
  publisher={Oxford University Press}
}`,
    },
    {
      title: 'LRCB: A Comprehensive Benchmark Evaluation of Reference-free Lossless Compression Tools for Genomics Sequencing Long Reads Data',
      authors: ['Hui Sun†', 'Huidong Ma†', 'Yingfeng Zheng', 'Haonan Xie', 'Meng Yan', 'Cheng Zhong', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'DCC 2024',
      venueFullName: 'Data Compression Conference',
      ccf: 'CCF-B',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'The advancement of long reads sequencing technologies has led to a significant increase in biological sequencing big data. Although several reference-free compressors are available for saving long reads data storage space, choosing the suitable one is challenging due to the shortage of thorough and systematic evaluations of their lossless compression effectiveness, both dedicated and general-purpose. In this study, we performed benchmark examinations on 30 compressors, including 11 specialized for long reads and 19 general-purpose ones, using 31 real-world datasets with differing sequencing platforms, species, and lengths. Each lossless compressor was evaluated on 13 performance measures, including compression strength, compression robustness, as well as time and peak memory required for compression and decompression. Additionally, for future long reads data compressors, we outlined investigation directions with consideration for privacy-sensitive sequences data security, hardware parallel acceleration, parameter tuning framework, and system hardware-algorithm integration design.',
      paperUrl: '/papers/2024_DCC_LRCBA_Comprehensive_Benchmark_Evaluation_of_Reference-free_Lossless_Compression_Tools_for_Genomics_Sequencing_Long_Reads_Data.pdf',
      codeUrl: 'https://github.com/fahaihi/LRCB',
      highlight: true,
      bibtex: `@inproceedings{sun2024lrcb,
  title={Lrcb: A comprehensive benchmark evaluation of reference-free lossless compression tools for genomics sequencing long reads data},
  author={Sun, Hui and Ma, Huidong and Zheng, Yingfeng and Xie, Haonan and Yan, Meng and Zhong, Cheng and Liu, Xiaoguang and Wang, Gang},
  booktitle={2024 Data Compression Conference (DCC)},
  pages={584--584},
  year={2024},
  organization={IEEE}
}`,
    },
    {
      title: 'SR2C: A Structurally Redundant Short Reads Collapser for Optimizing DNA Data Compression',
      authors: ['Hui Sun†', 'Huidong Ma†', 'Yingfeng Zheng', 'Haonan Xie', 'Xiaofei Wang', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'ICPADS 2023',
      venueFullName: 'IEEE International Conference on Parallel and Distributed Systems',
      ccf: 'CCF-C',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'The current redundant sequence deduplication algorithms cannot remove structural repetitive DNA short reads such as mirror, reverse, paired, and complementary palindromes in high-throughput genomics sequencing data. Moreover, these methods also cannot construct indexes to recover the original sequences, thus failing to meet the requirements of lossless compression for downstream applications. To address these problems, we propose a data structure called Cycle-Hash-Linkage (CHL) and present a CPU parallelism optimization algorithm named SR2C (Structurally Redundant Short Reads Collapser) based on CHL to improve the compression ratio of DNA sequencing data. Experimental results on actual data from the NCBI database demonstrate that SR2C achieves an average residual sequence percentage improvement of 2.556% compared to the state-of-the-art redundant sequence deduplication algorithm, Minirmd. Furthermore, SR2C cascaded optimization improves the average compression ratios of compression algorithms Pigz, PBzip2, XZ, and 7Z by 92.345%, 78.999%, 10.132%, and 7.434%, respectively. By leveraging multi-core CPU parallel computation, SR2C effectively reduces time consumption, which achieves 2–5× deduplication and recovers acceleration.',
      paperUrl: '/papers/2023_ICPADS_SR2CA_Structurally_Redundant_Short_Reads_Collapser_for_Optimizing_DNA_Data_Compression.pdf',
      codeUrl: 'https://github.com/fahaihi/SR2C',
      highlight: true,
      bibtex: `@inproceedings{sun2023sr2c,
  title={Sr2c: A structurally redundant short reads collapser for optimizing dna data compression},
  author={Sun, Hui and Ma, Huidong and Zheng, Yingfeng and Xie, Haonan and Wang, Xiaofei and Liu, Xiaoguang and Wang, Gang},
  booktitle={2023 IEEE 29th International Conference on Parallel and Distributed Systems (ICPADS)},
  pages={60--67},
  year={2023},
  organization={IEEE}
}`,
    },
    {
      title: 'PMFFRC: a large-scale genomic short reads compression optimizer via memory modeling and redundant clustering',
      authors: ['Hui Sun', 'Yingfeng Zheng', 'Haonan Xie', 'Huidong Ma', 'Xiaoguang Liu', 'Gang Wang'],
      venue: 'BMC Bioinformatics 2023',
      venueFullName: 'BMC Bioinformatics',
      ccf: 'CCF-C',
      casTier: { zh: '中科院2区', en: 'CAS Tier 2' },
      jcr: 'JCR Q1',
      impactFactor: 'IF 4.4',
      tags: [],
      abstract: 'Genomic sequencing reads compressors are essential for balancing high-throughput sequencing short reads generation speed, large-scale genomic data sharing, and infrastructure storage expenditure. However, most existing short reads compressors rarely utilize big-memory systems and duplicative information between diverse sequencing files to achieve a higher compression ratio for conserving reads data storage space. We employ compression ratio as the optimization objective and propose a large-scale genomic sequencing short reads data compression optimizer, named PMFFRC, through novelty memory modeling and redundant reads clustering technologies. By cascading PMFFRC, in 982 GB fastq format sequencing data, with 274 GB and 3.3 billion short reads, the state-of-the-art and reference-free compressors HARC, SPRING, Mstcom, and FastqCLS achieve 77.89%, 77.56%, 73.51%, and 29.36% average maximum compression ratio gains, respectively. PMFFRC saves 39.41%, 41.62%, 40.99%, and 20.19% of storage space sizes compared with the four unoptimized compressors.',
      paperUrl: '/papers/2023_BMC_Bioinformatics_PMFFRCa_large-scale_genomic_short_reads_compression_optimizer_via_memory_modeling_and_redundant_clustering.pdf',
      bibtex: `@article{sun2023pmffrc,
  title={PMFFRC: a large-scale genomic short reads compression optimizer via memory modeling and redundant clustering},
  author={Sun, Hui and Zheng, Yingfeng and Xie, Haonan and Ma, Huidong and Liu, Xiaoguang and Wang, Gang},
  journal={BMC bioinformatics},
  volume={24},
  number={1},
  pages={454},
  year={2023},
  publisher={Springer}
}`,
    },
    {
      title: 'ricME: Long-Read Based Mobile Element Variant Detection Using Sequence Realignment and Identity Calculation',
      authors: ['Huidong Ma', 'Cheng Zhong', 'Hui Sun', 'Danyang Chen', 'Haixiang Lin'],
      venue: 'ISBRA 2023',
      venueFullName: 'International Symposium on Bioinformatics Research and Applications',
      ccf: 'CCF-C',
      casTier: '',
      jcr: '',
      impactFactor: '',
      tags: [],
      abstract: 'The mobile element variant is a very important structural variant, accounting for a quarter of structural variants, and it is closely related to many issues such as genetic diseases and species diversity. However, few detection algorithms of mobile element variants have been developed on third-generation sequencing data. We propose an algorithm ricME that combines sequence realignment and identity calculation for detecting mobile element variants. The ricME first performs an initial detection to obtain the positions of insertions and deletions, and extracts the variant sequences; then applies sequence realignment and identity calculation to obtain the transposon classes related to the variant sequences; finally, adopts a multi-level judgment rule to achieve accurate detection of mobile element variants based on the transposon classes and identities. Compared with a representative long-read based mobile element variant detection algorithm rMETL, the ricME improves the F1-score by 11.5% and 21.7% on simulated datasets and real datasets, respectively.',
      paperUrl: '/papers/2023_ISBRA_ricMELong-Read_Based_Mobile_Element_Variant_Detection_Using_Sequence_Realignment_and_Identity_Calculation.pdf',
      codeUrl: 'https://github.com/huidong-ma/ricME',
      highlight: true,
      bibtex: `@inproceedings{ma2023ricme,
  title={ricme: Long-read based mobile element variant detection using sequence realignment and identity calculation},
  author={Ma, Huidong and Zhong, Cheng and Sun, Hui and Chen, Danyang and Lin, Haixiang},
  booktitle={International Symposium on Bioinformatics Research and Applications},
  pages={165--177},
  year={2023},
  organization={Springer}
}`,
    },
    {
      title: 'cnnLSV: detecting structural variants by encoding long-read alignment information and convolutional neural network',
      authors: ['Huidong Ma', 'Cheng Zhong', 'Danyang Chen', 'Haofa He', 'Feng Yang'],
      venue: 'BMC Bioinformatics 2023',
      venueFullName: 'BMC Bioinformatics',
      ccf: 'CCF-C',
      casTier: { zh: '中科院2区', en: 'CAS Tier 2' },
      jcr: 'JCR Q1',
      impactFactor: 'IF 4.4',
      tags: [],
      abstract: 'Genomic structural variant detection is a significant and challenging issue in genome analysis. The existing long‑read based structural variant detection methods still have space for improvement in detecting multi‑type structural variants. In this paper, we propose a method called cnnLSV to obtain detection results with higher quality by eliminating false positives in the detection results merged from the callsets of existing methods. We design an encoding strategy for four types of structural variants to represent long‑read alignment information around structural variants into images, input the images into a constructed convolutional neural network to train a filter model, and load the trained model to remove the false positives to improve the detection performance. We also eliminate mislabeled training samples in the training model phase by using principal component analysis algorithm and unsupervised clustering algorithm k‑means. Experimental results on both simulated and real datasets show that our proposed method outperforms existing methods overall in detecting insertions, deletions, inversions, and duplications. The program of cnnLSV is available at https://github.com/mhuidong/cnnLSV.',
      paperUrl: '/papers/2023_BMC_Bioinformatics_cnnLSVdetecting_structural_variants_by_encoding_long-read_alignment_information_and_convolutional_neural_network.pdf',
      codeUrl: 'https://github.com/huidong-ma/cnnLSV',
      highlight: true,
      bibtex: `@article{ma2023cnnlsv,
  title={cnnLSV: detecting structural variants by encoding long-read alignment information and convolutional neural network},
  author={Ma, Huidong and Zhong, Cheng and Chen, Danyang and He, Haofa and Yang, Feng},
  journal={BMC bioinformatics},
  volume={24},
  number={1},
  pages={119},
  year={2023},
  publisher={Springer}
}`,
    },
  ],

  // 9. 荣誉与奖项
  honors: [
    {
      name: {
        zh: '研究生公能奖学金一等奖',
        en: 'First-Class Gongneng Graduate Scholarship',
      },
      date: '2025, 2026',
      issuer: { zh: '南开大学', en: 'Nankai University' },
    },
    {
      name: {
        zh: '国家建设高水平公派研究生项目奖学金',
        en: 'Scholarship for the State-Sponsored Graduate Study Program',
      },
      date: '2025',
      issuer: {
        zh: '国家留学基金管理委员会',
        en: 'China Scholarship Council',
      },
    },
    {
      name: {
        zh: 'Massive Storage 第三届大学生信息存储技术竞赛二等奖',
        en: 'Second Prize, Third Massive Storage University Student Information Storage Technology Competition',
      },
      date: '2025',
      issuer: {
        zh: '全国大学生信息存储技术竞赛组委会',
        en: 'Organizing Committee of the National University Student Information Storage Technology Competition',
      },
    },
    {
      name: {
        zh: '广西计算机成果奖二等奖',
        en: 'Second Prize, Guangxi Computer Achievement Award',
      },
      date: '2024',
      issuer: { zh: '广西计算机学会', en: 'Guangxi Computer Society' },
    },
    {
      name: {
        zh: '南开大学第六届“校长杯”创新创业大赛一等奖',
        en: "First Prize, Sixth Nankai University President's Cup Innovation and Entrepreneurship Competition",
      },
      date: '2024',
      issuer: { zh: '南开大学', en: 'Nankai University' },
    },
    {
      name: {
        zh: '“天开杯”创聚津门全国大学生智能科技创新创业挑战赛优秀奖',
        en: 'Excellence Award, Tiankai Cup National University Student Intelligent Technology Innovation and Entrepreneurship Challenge',
      },
      date: '2024',
      issuer: {
        zh: '天津市教育委员会、天津市科学技术局',
        en: 'Tianjin Municipal Education Commission; Tianjin Municipal Science and Technology Bureau',
      },
    },
    {
      name: {
        zh: '英特尔 oneAPI 校园黑客松大赛优秀分享奖',
        en: 'Outstanding Sharing Award, Intel oneAPI Campus Hackathon',
      },
      date: '2023',
      issuer: { zh: '英特尔', en: 'Intel' },
    },
  ],

  // 10. 专业服务与学术兼职
  services: [
    {
      role: {
        zh: '期刊审稿人',
        en: 'Journal Reviewer',
      },
      organization: {
        zh: 'IEEE/ACM Transactions on Computational Biology and Bioinformatics',
        en: 'IEEE/ACM Transactions on Computational Biology and Bioinformatics',
      },
      period: '2026',
      type: 'review',
    },
    {
      role: {
        zh: '期刊审稿人',
        en: 'Journal Reviewer',
      },
      organization: {
        zh: 'Information Sciences',
        en: 'Information Sciences',
      },
      period: '2026',
      type: 'review',
    },
    {
      role: {
        zh: '期刊审稿人',
        en: 'Journal Reviewer',
      },
      organization: {
        zh: 'IEEE Transactions on Network Science and Engineering',
        en: 'IEEE Transactions on Network Science and Engineering',
      },
      period: '2025',
      type: 'review',
    },
    {
      role: {
        zh: '期刊审稿人',
        en: 'Journal Reviewer',
      },
      organization: {
        zh: 'GiGaScience',
        en: 'GiGaScience',
      },
      period: '2025',
      type: 'review',
    },
    {
      role: {
        zh: '期刊审稿人',
        en: 'Journal Reviewer',
      },
      organization: {
        zh: 'Journal of Algorithms & Computational Technology',
        en: 'Journal of Algorithms & Computational Technology',
      },
      period: '2023',
      type: 'review',
    },
    {
      role: {
        zh: '会议审稿人',
        en: 'Conference Reviewer',
      },
      organization: {
        zh: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining (SIGKDD)',
        en: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining (SIGKDD)',
      },
      period: '2026',
      type: 'review',
    },
    {
      role: {
        zh: '会议审稿人',
        en: 'Conference Reviewer',
      },
      organization: {
        zh: 'The Web Conference (WWW)',
        en: 'The Web Conference (WWW)',
      },
      period: '2025',
      type: 'review',
    },
    {
      role: {
        zh: '会议审稿人',
        en: 'Conference Reviewer',
      },
      organization: {
        zh: 'IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)',
        en: 'IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)',
      },
      period: '2025',
      type: 'review',
    },
  ],

  // 11. 相册专辑 (每一行为一个专辑，包含封面及专辑内系列照片，支持灯箱大图及多模式浏览)
  // 提示：所有专辑照片推荐统一存放在 public/images/albums/[专辑ID]/ 目录下，
  // 例如：public/images/albums/singapore-journey/cover.jpg
  // 维护方式：新建专辑只需在 public/images/albums/ 下新建文件夹并放入图片，直接在下方填写路径即可。
  albums: [
    {
      id: '202607-usa-sd',
      title: { zh: 'ACL 2026 参会纪行', en: 'ACL 2026 Conference in San Diego' },
      location: { zh: '美国 · 圣迭戈', en: 'San Diego, USA' },
      date: '',
      coverPhotoId: 'IMG_8173',
      photos: [
        {
          id: 'IMG_7541',
          title: { zh: 'Old Town 的参天大树', en: 'A Towering Tree in Old Town' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7541.JPG',
          location: { zh: 'Old Town', en: 'Old Town' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7628',
          title: { zh: 'Fallen Star', en: 'Fallen Star' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7628.JPG',
          location: { zh: '加利福尼亚大学圣迭戈分校', en: 'University of California San Diego (UC San Diego)' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7637',
          title: { zh: 'The Bear', en: 'The Bear' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7637.JPG',
          location: { zh: '加利福尼亚大学圣迭戈分校', en: 'University of California San Diego (UC San Diego)' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7707',
          title: { zh: '拉霍亚的海鸥', en: 'Seagulls in La Jolla' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7707.JPG',
          location: { zh: '拉霍亚', en: 'La Jolla' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7725',
          title: { zh: '拉霍亚的海滩', en: 'Beach in La Jolla' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7725.JPG',
          location: { zh: '拉霍亚', en: 'La Jolla' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7747',
          title: { zh: 'Ellen Browning Scripps Park', en: 'Ellen Browning Scripps Park' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7747.JPG',
          location: { zh: '拉霍亚', en: 'La Jolla' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7764',
          title: { zh: 'Ellen Browning Scripps Park', en: 'Ellen Browning Scripps Park' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7764.JPG',
          location: { zh: '拉霍亚', en: 'La Jolla' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_7979',
          title: { zh: '码头夜景', en: 'Pier at Night' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_7979.JPG',
          location: { zh: '克罗拉多轮渡', en: 'Coronado Ferry' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
        {
          id: 'IMG_8173',
          title: { zh: '中途岛号俯瞰', en: 'View from the USS Midway' },
          imageUrl: '/images/albums/202607-usa-sd/IMG_8173.JPG',
          location: { zh: '中途岛号博物馆', en: 'USS Midway Museum' },
          date: '2026.07',
          caption: { zh: '', en: '' },
        },
      ],
    },
  ],
  gallery: [],

  // 12. 音乐板块 (Music & Audio)
  // 说明：
  // 1. 歌曲信息（歌名、歌手名、专辑名）采用固定文本，中英文切换时保持固定不变；
  // 2. 音频文件存放在 public/audio/ 目录下（支持 .mp3, .wav, .flac 等）；
  // 
  // 【添加歌曲示例 Example】：
  // {
  //   id: 'track-custom',                    // 唯一标识 (Unique ID)
  //   title: '稻香 (Rice Field)',             // <-- 【歌名】(Song Title)
  //   artist: '周杰伦 (Jay Chou)',            // <-- 【歌手名】(Artist Name)
  //   album: '魔杰座 (Capricorn)',            // <-- 【专辑名】(Album Name)
  //   audioUrl: '/audio/daoxiang.mp3',       // <-- 【音频本地路径】(放在 public/audio/ 下)
  //   duration: '03:43',                     // <-- 【时长】(Duration mm:ss)
  // },
  music: [
    // {
    //   id: 'track-1',
    //   title: 'Deep Focus (沉浸研学)',
    //   artist: 'Acoustic Piano & Harmonic Pad',
    //   album: 'Flow State Vol. 1',
    //   duration: '00:22',
    //   audioUrl: '/audio/deep-focus.wav',
    // },
  ],
};
