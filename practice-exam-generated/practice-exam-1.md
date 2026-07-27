---
layout: exam
---

# Practice Exam 1

1. A development team wants a browser-based interface to create Amazon EC2 instances, configure networking, and manage storage without installing any software. Which AWS service should they use?
    - A. AWS SDK
    - B. AWS Command Line Interface (AWS CLI)
    - C. AWS Management Console
    - D. AWS CloudFormation

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

2. An application experiences increased traffic during business hours. Which action is an example of horizontal scaling?
    - A. Changing an EC2 instance from t3.medium to t3.large
    - B. Increasing the EBS volume size attached to an EC2 instance
    - C. Launching additional EC2 instances behind an Elastic Load Balancer
    - D. Increasing the memory allocation of an RDS instance

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

3. An administrator wants to determine which IAM user deleted an Amazon S3 bucket yesterday. Which AWS service records this information?
    - A. Amazon CloudWatch
    - B. AWS Config
    - C. AWS CloudTrail
    - D. AWS Trusted Advisor

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

4. Which TWO AWS Well-Architected Framework design principles help improve workload reliability?
    - A. Automatically recover from failures
    - B. Grant all developers administrator access
    - C. Scale horizontally to increase aggregate capacity
    - D. Deploy every workload in a single Availability Zone
    - E. Delete backups after successful deployments

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, C
    </details>

5. Which statement best describes the AWS Shared Responsibility Model?
    - A. AWS is responsible for configuring customer security groups.
    - B. Customer responsibilities vary depending on the AWS services they use.
    - C. Customers always manage the physical infrastructure.
    - D. AWS patches the guest operating system for every EC2 instance.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

6. A company uses AWS Organizations with consolidated billing. One account purchases Amazon EC2 Reserved Instances. What benefit can eligible linked accounts receive?
    - A. Automatic instance resizing
    - B. Shared Reserved Instance pricing discounts
    - C. Increased Free Tier limits
    - D. Dedicated hardware allocation

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

7. A web application must remain available if one Availability Zone becomes unavailable. Which architecture provides the highest availability?
    - A. Deploy all resources in one Availability Zone
    - B. Deploy resources across multiple Availability Zones behind a load balancer
    - C. Increase the size of one EC2 instance
    - D. Place all application servers in one subnet

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

8. Which TWO capabilities are provided by AWS Snowball Edge?
    - A. Secure offline transfer of large datasets
    - B. Local data processing using onboard compute
    - C. Automatic database replication across Regions
    - D. Global DNS management
    - E. Continuous object versioning

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

9. An organisation with AWS Enterprise Support needs assistance with account management and billing questions. Which AWS resource should they contact?
    - A. AWS Abuse Team
    - B. AWS Support Concierge
    - C. AWS Health Dashboard
    - D. Amazon CloudWatch

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

10. A company hosts its application only in the Europe (Frankfurt) Region. Customers in South America experience high latency. Which action is most likely to improve performance?
    - A. Increase the EC2 instance size
    - B. Deploy the application in a Region closer to South American users
    - C. Enable detailed billing reports
    - D. Purchase Reserved Instances

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

11. A company wants to assign identical AWS permissions to all members of its database administration team. Which IAM feature should be used?
    - A. IAM Roles
    - B. IAM User Groups
    - C. Access Keys
    - D. Service Control Policies

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

12. A company plans to migrate an on-premises PostgreSQL database to Amazon RDS with minimal downtime. Which AWS service is designed for this task?
    - A. AWS DataSync
    - B. AWS Database Migration Service (AWS DMS)
    - C. AWS Backup
    - D. Amazon Athena

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

13. Which AWS Cloud characteristic allows resources to automatically increase or decrease according to workload demand?
    - A. Agility
    - B. Elasticity
    - C. Durability
    - D. Governance

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

14. Which TWO benefits are commonly achieved by migrating workloads to AWS?
    - A. Faster infrastructure deployment
    - B. Ownership of AWS physical servers
    - C. Increased business agility
    - D. Elimination of all security responsibilities
    - E. Unlimited Free Tier usage

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, C
    </details>

15. Why are loosely coupled application components considered an AWS best practice?
    - A. They require fewer security controls.
    - B. They minimise the impact of failures between components.
    - C. They eliminate the need for monitoring.
    - D. They guarantee zero downtime.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

16. A finance team wants to analyse how much each AWS service contributed to last month's cloud bill. Which AWS service provides this information through interactive visualisations?
    - A. AWS Pricing Calculator
    - B. AWS Cost Explorer
    - C. AWS Budgets
    - D. Amazon CloudWatch

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

17. An organisation uses AWS Organizations to centrally manage multiple AWS accounts. Which financial advantage does consolidated billing provide?
    - A. Each account receives a separate monthly invoice.
    - B. Usage across eligible accounts can contribute toward volume pricing discounts.
    - C. Every account receives unlimited AWS Free Tier benefits.
    - D. Reserved Instances can only be used by the management account.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

18. Which TWO actions help protect data stored on Amazon EBS volumes?
    - A. Create Amazon EBS snapshots regularly.
    - B. Encrypt EBS volumes using AWS Key Management Service (AWS KMS).
    - C. Store all data on instance store volumes.
    - D. Disable automatic backups.
    - E. Restrict access by deleting IAM users.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

19. Which statement best describes elasticity in the AWS Cloud?
    - A. Resources automatically adjust to match changes in demand.
    - B. Applications always run in multiple AWS Regions.
    - C. Storage capacity never changes after deployment.
    - D. Customers must manually provision additional infrastructure.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

20. A startup wants to receive an email notification whenever its monthly AWS spending exceeds a defined budget. Which TWO services can be used together?
    - A. AWS Budgets
    - B. Amazon SNS
    - C. Amazon Inspector
    - D. AWS CloudTrail
    - E. Amazon Route 53

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct key is A, B
    </details>

21. Amazon CloudFront delivers content with low latency by using which AWS infrastructure?
    - A. AWS Regions
    - B. Availability Zones
    - C. Edge Locations
    - D. Local Zones

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

22. What is the primary purpose of the Principle of Least Privilege?
    - A. Grant every user administrative permissions.
    - B. Provide only the permissions required to perform assigned tasks.
    - C. Share one IAM user among multiple administrators.
    - D. Assign identical permissions to every IAM group.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

23. Which cloud service model provides customers with complete software applications managed by the service provider?
    - A. Infrastructure as a Service (IaaS)
    - B. Platform as a Service (PaaS)
    - C. Software as a Service (SaaS)
    - D. Function as a Service (FaaS)

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

24. A healthcare organisation must archive patient records for many years. The files are rarely accessed but must be retained at the lowest possible storage cost. Which AWS storage class is the best choice?
    - A. Amazon S3 Standard
    - B. Amazon S3 Intelligent-Tiering
    - C. Amazon S3 Glacier Deep Archive
    - D. Amazon EFS

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

25. Which AWS service allows customers to register domain names and manage DNS records?
    - A. Amazon CloudFront
    - B. Amazon VPC
    - C. Amazon Route 53
    - D. AWS Direct Connect

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

26. Which TWO AWS services help protect web applications from distributed denial-of-service (DDoS) attacks?
    - A. AWS Shield
    - B. AWS WAF
    - C. Amazon Inspector
    - D. AWS Secrets Manager
    - E. Amazon Macie

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

27. An application frequently retrieves the same product catalogue information from its database. Which AWS service can improve response times by caching this data?
    - A. Amazon SQS
    - B. Amazon ElastiCache
    - C. AWS DataSync
    - D. Amazon EBS

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

28. A company needs Amazon EC2 instances for a three-day training workshop. The instances must remain available throughout the event. Which pricing option is the most appropriate?
    - A. Spot Instances
    - B. On-Demand Instances
    - C. Reserved Instances
    - D. Dedicated Hosts

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

29. A research organisation runs fault-tolerant simulations overnight and wants to minimise compute costs. Which EC2 purchasing option should it use?
    - A. Dedicated Hosts
    - B. On-Demand Instances
    - C. Reserved Instances
    - D. Spot Instances

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

30. Which AWS service is designed to distribute static and dynamic web content globally with low latency?
    - A. Amazon Route 53
    - B. Amazon CloudFront
    - C. AWS Direct Connect
    - D. Amazon API Gateway

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

31. A company needs to download AWS compliance reports, such as ISO certifications and SOC reports, for an internal audit. Which AWS service should the company use?
    - A. AWS Artifact
    - B. AWS Config
    - C. AWS CloudTrail
    - D. Amazon Inspector

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

32. Which TWO AWS services are fully managed, meaning AWS handles infrastructure provisioning, patching, and maintenance?
    - A. Amazon DynamoDB
    - B. Amazon RDS
    - C. Amazon EC2
    - D. Amazon VPC
    - E. Amazon EBS

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

33. An application requires a highly available NoSQL database with single-digit millisecond latency. Which AWS service best meets this requirement?
    - A. Amazon Aurora
    - B. Amazon Redshift
    - C. Amazon DynamoDB
    - D. Amazon RDS for MySQL

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

34. A company has subscribed to AWS Enterprise Support and wants a designated technical advisor who understands its cloud environment and provides proactive guidance. Which AWS role fulfills this requirement?
    - A. AWS Support Engineer
    - B. Technical Account Manager (TAM)
    - C. AWS Solutions Architect
    - D. AWS Concierge

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

35. Which AWS service enables users to visualize historical spending trends and forecast future AWS costs?
    - A. AWS Cost Explorer
    - B. AWS Budgets
    - C. AWS Billing Dashboard
    - D. AWS Pricing Calculator

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

36. A developer wants to use the AWS CLI from a local laptop to create Amazon S3 buckets. Which credentials are required for programmatic access?
    - A. IAM username and password
    - B. Access key ID and secret access key
    - C. Root account email address
    - D. AWS account ID only

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

37. A customer discovers that an EC2 instance in their AWS account has been compromised and is sending spam emails. Which AWS team should be contacted?
    - A. AWS Concierge
    - B. AWS Abuse Team
    - C. AWS Sales Team
    - D. AWS Billing Support

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

38. Which TWO activities are considered shared responsibilities between AWS and the customer under the AWS Shared Responsibility Model?
    - A. Configuration management
    - B. Patch management
    - C. Physical security of AWS data centres
    - D. Hardware maintenance
    - E. Global network infrastructure

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

39. A company wants its application to automatically replace unhealthy EC2 instances and distribute traffic across healthy instances. Which TWO AWS services should be used together?
    - A. Amazon EC2 Auto Scaling
    - B. Elastic Load Balancing (ELB)
    - C. Amazon Athena
    - D. Amazon EventBridge
    - E. AWS CloudShell

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

40. A global video streaming platform wants users around the world to experience fast content delivery with minimal latency. Which AWS service should be used?
    - A. Amazon CloudFront
    - B. AWS Lambda
    - C. Amazon SQS
    - D. AWS CloudFormation

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

41. A company is building a web application with a relational database and wants automated backups, automated software patching, and Multi-AZ deployment support. Which AWS service should it choose?
    - A. Amazon EC2 with MySQL installed
    - B. Amazon RDS
    - C. Amazon DynamoDB
    - D. Amazon Neptune

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

42. Which AWS service allows developers and administrators to define and provision infrastructure using templates?
    - A. AWS CloudFormation
    - B. AWS Config
    - C. AWS Systems Manager
    - D. Amazon EventBridge

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

43. Under the AWS Shared Responsibility Model, which responsibility belongs to AWS?
    - A. Managing physical servers and networking infrastructure
    - B. Creating IAM users
    - C. Configuring Security Groups
    - D. Encrypting customer application data

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

44. Which TWO features are provided by AWS Health Dashboard?
    - A. Personalized notifications about AWS events affecting your resources
    - B. Status information for AWS services
    - C. Automatic security patch installation
    - D. Cost optimization recommendations
    - E. Automatic EC2 scaling

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

45. Which AWS monitoring service collects resource metrics, creates alarms, and displays operational dashboards for AWS resources?
    - A. AWS CloudTrail
    - B. Amazon CloudWatch
    - C. AWS Config
    - D. Amazon Inspector

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

46. A company wants recommendations to improve security, reduce costs, increase performance, and enhance fault tolerance across its AWS environment. Which AWS service provides these recommendations?
    - A. AWS Trusted Advisor
    - B. AWS Config
    - C. Amazon GuardDuty
    - D. AWS CloudTrail

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

47. Which TWO statements about Amazon S3 are correct?
    - A. Amazon S3 is designed to provide high durability for stored objects.
    - B. Amazon S3 can directly host virtual machines.
    - C. Amazon S3 can store virtually unlimited numbers of objects.
    - D. Amazon S3 volumes must be attached to Amazon EC2 instances before use.
    - E. Amazon S3 objects are limited to 100 MB in size.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, C
    </details>

48. Under the AWS Shared Responsibility Model, which TWO security tasks are the responsibility of the customer?
    - A. Configuring Security Groups
    - B. Creating and managing IAM policies
    - C. Maintaining AWS data centre facilities
    - D. Replacing failed storage devices
    - E. Managing the AWS global network infrastructure

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

49. A company wants to deploy a widely used enterprise application on AWS by using AWS-provided deployment guidance and reference architectures. Which AWS resource should they use?
    - A. AWS Quick Starts
    - B. Amazon CloudWatch
    - C. AWS Batch
    - D. AWS Systems Manager

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

50. A business purchases Amazon EC2 Reserved Instances for a three-year period. During that time, its compute requirements change significantly. Which Reserved Instance option allows the company to exchange the reservation for another eligible Reserved Instance?
    - A. Standard Reserved Instance
    - B. Convertible Reserved Instance
    - C. Spot Instance
    - D. Dedicated Host

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>
