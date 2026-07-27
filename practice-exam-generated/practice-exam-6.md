---
layout: exam
---

# Practice Exam 6

1. A developer needs to interact with Amazon DynamoDB directly from a Java application without manually creating HTTPS requests. Which AWS tool should the developer use?
    - A. AWS Management Console
    - B. AWS SDK
    - C. AWS CloudShell
    - D. AWS Cost Explorer

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

2. An online ticket booking platform experiences sudden traffic spikes whenever concert tickets are released. Which AWS capability enables the application to automatically launch additional compute resources?
    - A. Durability
    - B. Elasticity
    - C. Governance
    - D. Consolidated Billing

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

3. A security engineer needs to determine who changed an IAM policy earlier today. Which AWS service records this activity?
    - A. AWS CloudTrail
    - B. Amazon CloudWatch
    - C. AWS Config
    - D. AWS Trusted Advisor

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

4. Which TWO AWS design principles contribute to building highly reliable workloads?
    - A. Automatically recover from failures.
    - B. Test recovery procedures regularly.
    - C. Store all resources in a single Availability Zone.
    - D. Disable monitoring to reduce operational costs.
    - E. Use one large EC2 instance for every workload.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

5. Which statement correctly describes the AWS Shared Responsibility Model?
    - A. AWS manages customer IAM users.
    - B. Customer responsibilities vary depending on the AWS service being used.
    - C. AWS patches every customer operating system.
    - D. Customers manage AWS data centres.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

6. A company has multiple AWS accounts linked through AWS Organizations. Which benefit is provided by consolidated billing?
    - A. Each account receives unlimited Free Tier benefits.
    - B. Eligible accounts can share volume pricing discounts.
    - C. Every account receives Reserved Instances automatically.
    - D. IAM users are automatically synchronised across accounts.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

7. A critical business application must continue operating even if one Availability Zone becomes unavailable. Which architecture is most appropriate?
    - A. Deploy all resources in one Availability Zone.
    - B. Deploy application servers across multiple Availability Zones behind an Elastic Load Balancer.
    - C. Upgrade to a larger EC2 instance.
    - D. Deploy all servers inside one subnet.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

8. Which TWO capabilities are available with AWS Snowball Edge?
    - A. Secure offline data transfer.
    - B. Local compute for edge processing.
    - C. Managed relational databases.
    - D. DNS management.
    - E. Automatic VPC creation.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

9. Which AWS Enterprise Support feature helps customers with billing, account, and subscription questions?
    - A. AWS Trusted Advisor
    - B. AWS Support Concierge
    - C. AWS Health Dashboard
    - D. AWS CloudTrail

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

10. A company hosts its application only in the Canada (Central) Region. Customers in Europe report slow response times. Which action is most likely to reduce latency?
    - A. Increase the EC2 instance size.
    - B. Deploy resources in an AWS Region closer to European users.
    - C. Purchase Savings Plans.
    - D. Increase EBS storage capacity.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

11. A company wants all members of its DevOps team to have identical AWS permissions. Which IAM feature should be used?
    - A. IAM User Groups
    - B. IAM Access Keys
    - C. AWS Organizations
    - D. IAM Roles Anywhere

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

12. Which AWS service is specifically designed to migrate databases into AWS while minimising application downtime?
    - A. AWS DataSync
    - B. AWS Database Migration Service (AWS DMS)
    - C. Amazon Athena
    - D. AWS Backup

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

13. Which AWS Cloud benefit allows organisations to rapidly provision and release resources whenever required?
    - A. Elasticity
    - B. Governance
    - C. Compliance
    - D. Availability

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

14. Which TWO advantages are commonly associated with adopting AWS Cloud?
    - A. Faster deployment of infrastructure.
    - B. Improved business agility.
    - C. Ownership of AWS networking equipment.
    - D. Elimination of all security responsibilities.
    - E. Unlimited Free Tier usage.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

15. Why does AWS recommend designing applications using loosely coupled components?
    - A. It removes the need for monitoring.
    - B. Failures in one component have less impact on other components.
    - C. It guarantees zero downtime.
    - D. It eliminates backup requirements.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

16. A cloud administrator wants to identify which AWS services generated the highest costs over the previous six months and view spending trends. Which AWS service should be used?
    - A. AWS Pricing Calculator
    - B. AWS Cost Explorer
    - C. Amazon CloudWatch
    - D. AWS Budgets

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

17. Which statement correctly describes a financial benefit of AWS Organizations consolidated billing?
    - A. Each account receives separate volume discounts.
    - B. Usage from eligible linked accounts can be aggregated to qualify for volume pricing discounts.
    - C. All accounts automatically receive Enterprise Support.
    - D. Reserved Instances cannot be shared between accounts.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

18. Which TWO actions help improve the security and recoverability of Amazon EBS data?
    - A. Create scheduled EBS snapshots.
    - B. Encrypt EBS volumes using AWS KMS.
    - C. Store production data only on instance store volumes.
    - D. Disable snapshot creation.
    - E. Increase the EC2 instance size.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

19. Which statement best defines elasticity in the AWS Cloud?
    - A. Resources automatically increase or decrease according to workload demand.
    - B. Resources are permanently provisioned for peak capacity.
    - C. Applications automatically replicate to every AWS Region.
    - D. Customers manually provision infrastructure every time demand changes.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

20. A company wants to receive notifications whenever forecasted monthly AWS spending exceeds a predefined threshold. Which TWO AWS services can accomplish this?
    - A. AWS Budgets
    - B. Amazon SNS
    - C. Amazon EventBridge
    - D. AWS CloudTrail
    - E. Amazon Inspector

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

21. Amazon CloudFront improves application performance primarily by delivering cached content from:
    - A. Availability Zones
    - B. Edge Locations
    - C. Local Zones only
    - D. Amazon S3 buckets

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

22. Which statement best reflects the Principle of Least Privilege?
    - A. Grant all IAM users full administrative access.
    - B. Assign only the permissions required to complete a specific task.
    - C. Share one IAM account among multiple administrators.
    - D. Allow unrestricted access inside a VPC.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

23. Which cloud computing model provides customers with fully managed software that is accessed over the internet?
    - A. Infrastructure as a Service (IaaS)
    - B. Platform as a Service (PaaS)
    - C. Software as a Service (SaaS)
    - D. Database as a Service (DBaaS)

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

24. A pharmaceutical company must retain archived research data for regulatory purposes. The data is rarely accessed but must be preserved for many years at the lowest storage cost. Which Amazon S3 storage class is most appropriate?
    - A. Amazon S3 Standard
    - B. Amazon S3 Intelligent-Tiering
    - C. Amazon S3 Glacier Instant Retrieval
    - D. Amazon S3 Glacier Deep Archive

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

25. Which AWS service is responsible for domain registration and highly available DNS routing?
    - A. Amazon Route 53
    - B. AWS Global Accelerator
    - C. Amazon CloudFront
    - D. AWS Direct Connect

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

26. Which TWO AWS services provide protection for internet-facing web applications against Distributed Denial of Service (DDoS) attacks?
    - A. AWS Shield
    - B. AWS WAF
    - C. Amazon Inspector
    - D. AWS Backup
    - E. AWS IAM Identity Center

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

27. An e-commerce website repeatedly retrieves the same inventory information from a database. Which AWS service can cache this data to improve response times?
    - A. Amazon ElastiCache
    - B. Amazon EBS
    - C. AWS DataSync
    - D. Amazon Athena

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

28. A company requires Amazon EC2 instances for a five-day training programme. The instances must remain available for the entire duration without interruption. Which purchasing option is the best choice?
    - A. Spot Instances
    - B. On-Demand Instances
    - C. Convertible Reserved Instances
    - D. Dedicated Hosts

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

29. A genomics research laboratory executes large-scale batch analysis jobs that can tolerate interruptions. Which EC2 purchasing option offers the greatest cost savings?
    - A. Dedicated Instances
    - B. On-Demand Instances
    - C. Reserved Instances
    - D. Spot Instances

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

30. Which AWS service is specifically designed to accelerate the global delivery of static and dynamic web content?
    - A. Amazon Route 53
    - B. AWS Direct Connect
    - C. Amazon CloudFront
    - D. Amazon API Gateway

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

31. A company needs to provide auditors with AWS compliance documents such as certifications and regulatory reports. Which AWS service should be used?
    - A. AWS Artifact
    - B. AWS Config
    - C. AWS CloudTrail
    - D. Amazon Inspector

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

32. A company wants to run a database service where AWS handles hardware provisioning, software patching, and database maintenance. Which AWS service should they choose?
    - A. Amazon EC2
    - B. Amazon RDS
    - C. Amazon Elastic File System (EFS)
    - D. Amazon Elastic Block Store (EBS)

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

33. A mobile application requires a highly scalable NoSQL database capable of handling millions of requests per second. Which AWS service is the best choice?
    - A. Amazon Aurora
    - B. Amazon DynamoDB
    - C. Amazon Redshift
    - D. Amazon Neptune

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

34. A company subscribed to AWS Enterprise Support requires personalized guidance for optimizing its AWS environment. Which AWS support resource provides this service?
    - A. AWS Support Concierge
    - B. Technical Account Manager (TAM)
    - C. AWS Abuse Team
    - D. AWS Marketplace Support

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

35. A cloud administrator wants to analyze AWS spending patterns and identify which services contribute most to monthly costs. Which AWS service should be used?
    - A. AWS Cost Explorer
    - B. AWS Budgets
    - C. AWS Pricing Calculator
    - D. AWS Organizations

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

36. A developer wants to access AWS resources programmatically from an application. Which credential type should be used?
    - A. AWS account password
    - B. Access keys
    - C. Billing credentials
    - D. Root user email address

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

37. An AWS customer discovers that their resources are being used to perform malicious activities against other systems. Which AWS team should they contact?
    - A. AWS Concierge Team
    - B. AWS Abuse Team
    - C. AWS Billing Team
    - D. AWS Training Team

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct key is B, wait, user wrote:
      Correct answer: B
    </details>

38. Which TWO examples represent shared controls in the AWS Shared Responsibility Model?
    - A. Patch management
    - B. Configuration management
    - C. Physical security of AWS facilities
    - D. AWS hardware maintenance
    - E. Global AWS network protection

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

39. A company wants automatic replacement of unhealthy EC2 instances and distribution of incoming traffic across available instances. Which TWO AWS services should be implemented?
    - A. Elastic Load Balancing
    - B. Amazon EC2 Auto Scaling
    - C. Amazon Athena
    - D. AWS Glue
    - E. Amazon S3

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

40. A company streams training videos to users worldwide and requires fast content delivery. Which AWS service should be used?
    - A. Amazon CloudFront
    - B. Amazon SQS
    - C. AWS Lambda
    - D. Amazon EC2

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

41. A company wants a managed relational database service that supports automated backups and Multi-AZ deployments. Which AWS service should be selected?
    - A. Amazon EC2 with a self-managed database
    - B. Amazon RDS
    - C. Amazon DynamoDB
    - D. Amazon S3

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

42. A cloud engineer wants to deploy AWS infrastructure repeatedly using configuration templates. Which AWS service provides this capability?
    - A. AWS CloudFormation
    - B. AWS CloudTrail
    - C. Amazon CloudWatch
    - D. AWS IAM

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

43. Under the AWS Shared Responsibility Model, which task is performed by AWS?
    - A. Managing physical security of AWS data centers
    - B. Creating IAM users
    - C. Configuring customer security groups
    - D. Encrypting customer application data

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

44. Which TWO features are provided by the AWS Health Dashboard?
    - A. Personalized notifications about AWS events affecting resources
    - B. AWS service availability information
    - C. Automatic vulnerability remediation
    - D. Cost optimization recommendations
    - E. IAM permission management

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

45. A company wants visibility into CPU utilization, memory usage, and application performance metrics. Which AWS service should it use?
    - A. AWS CloudTrail
    - B. Amazon CloudWatch
    - C. AWS Artifact
    - D. Amazon Inspector

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

46. A company wants AWS recommendations for improving security, reliability, and cost efficiency. Which service provides these checks?
    - A. AWS Trusted Advisor
    - B. AWS Config
    - C. Amazon GuardDuty
    - D. AWS Shield

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

47. Which TWO statements correctly describe Amazon S3?
    - A. Amazon S3 provides highly durable object storage.
    - B. Amazon S3 is used to host virtual machine operating systems.
    - C. Amazon S3 can store a virtually unlimited number of objects.
    - D. Amazon S3 requires users to manage physical storage devices.
    - E. Amazon S3 only supports database storage.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, C
    </details>

48. Which TWO security tasks are the responsibility of the customer in the AWS Shared Responsibility Model?
    - A. Managing IAM permissions
    - B. Configuring security groups
    - C. Protecting AWS data centers
    - D. Maintaining AWS networking hardware
    - E. Replacing failed AWS servers

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>

49. A company wants to deploy common enterprise solutions on AWS using AWS-created deployment patterns. Which AWS resource should it use?
    - A. AWS Quick Starts
    - B. Amazon CloudWatch
    - C. AWS Billing Console
    - D. Amazon Inspector

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

50. A company purchased an EC2 Reserved Instance but expects its compute requirements to change in the future. Which Reserved Instance type provides the flexibility to exchange for another configuration?
    - A. Standard Reserved Instance
    - B. Convertible Reserved Instance
    - C. Spot Instance
    - D. Dedicated Instance

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>
